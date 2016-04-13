<?php

require_once 'custom.php';

// OneThink常量定义
const ONETHINK_VERSION    = '1.0.131218';
const ONETHINK_ADDON_PATH = './Addons/';

/**
 * 系统公共库文件
 * 主要定义系统公共函数库
 */

/**
 * 检测用户是否登录
 * @return integer 0-未登录，大于0-当前登录用户ID
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function is_login_admin(){
    $user = session('user_auth');
    if (empty($user)) {
        return 0;
    } else {
        return session('user_auth_sign') == data_auth_sign($user) ? $user['uid'] : 0;
    }
}

function is_login(){
    $user = session('user_auth');
    if (empty($user)) {
        return 0;
    } else {
        return session('user_auth_sign') == data_auth_sign($user) ? $user['uid'] : 0;
    }
}

//读取用户存储信息
function getUsersSession($key=''){
    $user = session('user_auth');
    if (empty($user)) {
        if($key) {
            return '';
        }
        else return array();
    } else {
        if($key) {
            return $user[$key];
        }
        else return $user;
    }
}

//写入到用户存储信息
function inputUsersSession($key,$value=NULL){
    $user = session('user_auth');
    $user[$key] = $value;
    session('user_auth', $user);
    session('user_auth_sign', data_auth_sign($user));
}

/**
 * 检测当前用户是否为管理员
 * @return boolean true-管理员，false-非管理员
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function is_administrator($uid = null){
    $uid = is_null($uid) ? is_login() : $uid;
    return $uid && (intval($uid) === C('USER_ADMINISTRATOR'));
}

/**
 * 字符串转换为数组，主要用于把分隔符调整到第二个参数
 * @param  string $str  要分割的字符串
 * @param  string $glue 分割符
 * @return array
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function str2arr($str, $glue = ','){
    return explode($glue, $str);
}

/**
 * 数组转换为字符串，主要用于把分隔符调整到第二个参数
 * @param  array  $arr  要连接的数组
 * @param  string $glue 分割符
 * @return string
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function arr2str($arr, $glue = ','){
    return implode($glue, $arr);
}

/**
 * 字符串截取，支持中文和其他编码
 * @static
 * @access public
 * @param string $str 需要转换的字符串
 * @param string $start 开始位置
 * @param string $length 截取长度
 * @param string $charset 编码格式
 * @param string $suffix 截断显示字符
 * @return string
 */
function msubstr($str, $start=0, $length, $charset="utf-8", $suffix=true) {
    if(function_exists("mb_substr"))
        $slice = mb_substr($str, $start, $length, $charset);
    elseif(function_exists('iconv_substr')) {
        $slice = iconv_substr($str,$start,$length,$charset);
        if(false === $slice) {
            $slice = '';
        }
    }else{
        $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $str, $match);
        $slice = join("",array_slice($match[0], $start, $length));
    }
    return $suffix ? $slice.'...' : $slice;
}

/**
 * 系统加密方法
 * @param string $data 要加密的字符串
 * @param string $key  加密密钥
 * @param int $expire  过期时间 单位 秒
 * @return string
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function think_encrypt($data, $key = '', $expire = 0) {
    $key  = md5(empty($key) ? C('DATA_AUTH_KEY') : $key);
    $data = base64_encode($data);
    $x    = 0;
    $len  = strlen($data);
    $l    = strlen($key);
    $char = '';

    for ($i = 0; $i < $len; $i++) {
        if ($x == $l) $x = 0;
        $char .= substr($key, $x, 1);
        $x++;
    }

    $str = sprintf('%010d', $expire ? $expire + time():0);

    for ($i = 0; $i < $len; $i++) {
        $str .= chr(ord(substr($data, $i, 1)) + (ord(substr($char, $i, 1)))%256);
    }
    return str_replace(array('+','/','='),array('-','_',''),base64_encode($str));
}

/**
 * 系统解密方法
 * @param  string $data 要解密的字符串 （必须是think_encrypt方法加密的字符串）
 * @param  string $key  加密密钥
 * @return string
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function think_decrypt($data, $key = ''){
    $key    = md5(empty($key) ? C('DATA_AUTH_KEY') : $key);
    $data   = str_replace(array('-','_'),array('+','/'),$data);
    $mod4   = strlen($data) % 4;
    if ($mod4) {
       $data .= substr('====', $mod4);
    }
    $data   = base64_decode($data);
    $expire = substr($data,0,10);
    $data   = substr($data,10);

    if($expire > 0 && $expire < time()) {
        return '';
    }
    $x      = 0;
    $len    = strlen($data);
    $l      = strlen($key);
    $char   = $str = '';

    for ($i = 0; $i < $len; $i++) {
        if ($x == $l) $x = 0;
        $char .= substr($key, $x, 1);
        $x++;
    }

    for ($i = 0; $i < $len; $i++) {
        if (ord(substr($data, $i, 1))<ord(substr($char, $i, 1))) {
            $str .= chr((ord(substr($data, $i, 1)) + 256) - ord(substr($char, $i, 1)));
        }else{
            $str .= chr(ord(substr($data, $i, 1)) - ord(substr($char, $i, 1)));
        }
    }
    return base64_decode($str);
}

/**
 * 数据签名认证
 * @param  array  $data 被认证的数据
 * @return string       签名
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function data_auth_sign($data) {
    //数据类型检测
    if(!is_array($data)){
        $data = (array)$data;
    }
    ksort($data); //排序
    $code = http_build_query($data); //url编码并生成query字符串
    $sign = sha1($code); //生成签名
    return $sign;
}

/**
* 对查询结果集进行排序
* @access public
* @param array $list 查询结果
* @param string $field 排序的字段名
* @param array $sortby 排序类型
* asc正向排序 desc逆向排序 nat自然排序
* @return array
*/
function list_sort_by($list,$field, $sortby='asc') {
   if(is_array($list)){
       $refer = $resultSet = array();
       foreach ($list as $i => $data)
           $refer[$i] = &$data[$field];
       switch ($sortby) {
           case 'asc': // 正向排序
                asort($refer);
                break;
           case 'desc':// 逆向排序
                arsort($refer);
                break;
           case 'nat': // 自然排序
                natcasesort($refer);
                break;
       }
       foreach ( $refer as $key=> $val)
           $resultSet[] = &$list[$key];
       return $resultSet;
   }
   return false;
}

/**
 * 把返回的数据集转换成Tree
 * @param array $list 要转换的数据集
 * @param string $pid parent标记字段
 * @param string $level level标记字段
 * @return array
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function list_to_tree($list, $pk='id', $pid = 'pid', $child = '_child', $root = 0) {
    // 创建Tree
    $tree = array();
    if(is_array($list)) {
        // 创建基于主键的数组引用
        $refer = array();
        foreach ($list as $key => $data) {
            $refer[$data[$pk]] =& $list[$key];
        }
        foreach ($list as $key => $data) {
            // 判断是否存在parent
            $parentId =  $data[$pid];
            if ($root == $parentId) {
                $tree[] =& $list[$key];
            }else{
                if (isset($refer[$parentId])) {
                    $parent =& $refer[$parentId];
                    $parent[$child][] =& $list[$key];
                }
            }
        }
    }
    return $tree;
}

/**
 * 将list_to_tree的树还原成列表
 * @param  array $tree  原来的树
 * @param  string $child 孩子节点的键
 * @param  string $order 排序显示的键，一般是主键 升序排列
 * @param  array  $list  过渡用的中间数组，
 * @return array        返回排过序的列表数组
 * @author yangweijie <yangweijiester@gmail.com>
 */
function tree_to_list($tree, $child = '_child', $order='id', &$list = array()){
    if(is_array($tree)) {
        $refer = array();
        foreach ($tree as $key => $value) {
            $reffer = $value;
            if(isset($reffer[$child])){
                unset($reffer[$child]);
                tree_to_list($value[$child], $child, $order, $list);
            }
            $list[] = $reffer;
        }
        $list = list_sort_by($list, $order, $sortby='asc');
    }
    return $list;
}

/**
 * 格式化字节大小
 * @param  number $size      字节数
 * @param  string $delimiter 数字和单位分隔符
 * @return string            格式化后的带单位的大小
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function format_bytes($size, $delimiter = '') {
    $units = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
    for ($i = 0; $size >= 1024 && $i < 5; $i++) $size /= 1024;
    return round($size, 2) . $delimiter . $units[$i];
}

/**
 * 设置跳转页面URL
 * 使用函数再次封装，方便以后选择不同的存储方式（目前使用cookie存储）
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function set_redirect_url($url){
    cookie('redirect_url', $url);
}

/**
 * 获取跳转页面URL
 * @return string 跳转页URL
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function get_redirect_url(){
    $url = cookie('redirect_url');
    return empty($url) ? __APP__ : $url;
}

/**
 * 处理插件钩子
 * @param string $hook   钩子名称
 * @param mixed $params 传入参数
 * @return void
 */
function hook($hook,$params=array()){
    \Think\Hook::listen($hook,$params);
}

/**
 * 获取插件类的类名
 * @param strng $name 插件名
 */
function get_addon_class($name){
    $class = "Addons\\{$name}\\{$name}Addon";
    return $class;
}

/**
 * 获取插件类的配置文件数组
 * @param string $name 插件名
 */
function get_addon_config($name){
    $class = get_addon_class($name);
    if(class_exists($class)) {
        $addon = new $class();
        return $addon->getConfig();
    }else {
        return array();
    }
}

/**
 * 插件显示内容里生成访问插件的url
 * @param string $url url
 * @param array $param 参数
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function addons_url($url, $param = array()){
    $url        = parse_url($url);
    $case       = C('URL_CASE_INSENSITIVE');
    $addons     = $case ? parse_name($url['scheme']) : $url['scheme'];
    $controller = $case ? parse_name($url['host']) : $url['host'];
    $action     = trim($case ? strtolower($url['path']) : $url['path'], '/');

    /* 解析URL带的参数 */
    if(isset($url['query'])){
        parse_str($url['query'], $query);
        $param = array_merge($query, $param);
    }

    /* 基础参数 */
    $params = array(
        '_addons'     => $addons,
        '_controller' => $controller,
        '_action'     => $action,
    );
    $params = array_merge($params, $param); //添加额外参数

    return U('Addons/execute', $params);
}

/**
 * 时间戳格式化
 * @param int $time
 * @return string 完整的时间显示
 * @author huajie <banhuajie@163.com>
 */
function time_format($time = NULL,$format='Y-m-d H:i'){
    $time = $time === NULL ? NOW_TIME : intval($time);
    return date($format, $time);
}

/**
 * 根据用户ID获取用户名
 * @param  integer $uid 用户ID
 * @return string       用户名
 */
function get_username($uid = 0){
    static $list;
    if(!($uid && is_numeric($uid))){ //获取当前登录用户名
        return session('user_auth.username');
    }

    /* 获取缓存数据 */
    if(empty($list)){
        $list = S('sys_active_user_list');
    }

    /* 查找用户信息 */
    $key = "u{$uid}";
    if(isset($list[$key])){ //已缓存，直接使用
        $name = $list[$key];
    } else { //调用接口获取用户信息
        $User = new User\Api\UserApi();
        $info = $User->info($uid);
        if($info && isset($info[1])){
            $name = $list[$key] = $info[1];
            /* 缓存用户 */
            $count = count($list);
            $max   = C('USER_MAX_CACHE');
            while ($count-- > $max) {
                array_shift($list);
            }
            S('sys_active_user_list', $list);
        } else {
            $name = '';
        }
    }
    return $name;
}

/**
 * 根据用户ID获取用户昵称
 * @param  integer $uid 用户ID
 * @return string       用户昵称
 */
function get_nickname($uid = 0){
    static $list;
    if(!($uid && is_numeric($uid))){ //获取当前登录用户名
        return session('user_auth.username');
    }

    /* 获取缓存数据 */
    if(empty($list)){
        $list = S('sys_user_nickname_list');
    }

    /* 查找用户信息 */
    $key = "u{$uid}";
    if(isset($list[$key])){ //已缓存，直接使用
        $name = $list[$key];
    } else { //调用接口获取用户信息
        $info = M('Member')->field('nickname')->find($uid);
        if($info !== false && $info['nickname'] ){
            $nickname = $info['nickname'];
            $name = $list[$key] = $nickname;
            /* 缓存用户 */
            $count = count($list);
            $max   = C('USER_MAX_CACHE');
            while ($count-- > $max) {
                array_shift($list);
            }
            S('sys_user_nickname_list', $list);
        } else {
            $name = '';
        }
    }
    return $name;
}

/**
 * 获取分类信息并缓存分类
 * @param  integer $id    分类ID
 * @param  string  $field 要获取的字段名
 * @return string         分类信息
 */
function get_category($id, $field = null){
    static $list;

    /* 非法分类ID */
    if(empty($id) || !is_numeric($id)){
        return '';
    }

    /* 读取缓存数据 */
    if(empty($list)){
        $list = S('sys_category_list');
    }

    /* 获取分类名称 */
    if(!isset($list[$id])){
        $cate = M('Category')->find($id);
        if(!$cate || 1 != $cate['status']){ //不存在分类，或分类被禁用
            return '';
        }
        $list[$id] = $cate;
        S('sys_category_list', $list); //更新缓存
    }
    return is_null($field) ? $list[$id] : $list[$id][$field];
}

/* 根据ID获取分类标识 */
function get_category_name($id){
    return get_category($id, 'name');
}

/* 根据ID获取分类名称 */
function get_category_title($id){
    return get_category($id, 'title');
}

function get_category_top ($id, $field = null){
    $array =  M('Category')->where("pid = 0")->field(true)->order('id asc')->select();
    if($id=="all"){
        return $array;
    }
    else return $array;
}

/**
 * 获取文档模型信息
 * @param  integer $id    模型ID
 * @param  string  $field 模型字段
 * @return array
 */
function get_document_model($id = null, $field = null){
    static $list;

    /* 非法分类ID */
    if(!(is_numeric($id) || is_null($id))){
        return '';
    }

    /* 读取缓存数据 */
    if(empty($list)){
        $list = S('DOCUMENT_MODEL_LIST');
    }

    /* 获取模型名称 */
    if(empty($list)){
        $map   = array('status' => 1, 'extend' => 1);
        $model = M('Model')->where($map)->field(true)->select();
        foreach ($model as $value) {
            $list[$value['id']] = $value;
        }
        S('DOCUMENT_MODEL_LIST', $list); //更新缓存
    }

    /* 根据条件返回数据 */
    if(is_null($id)){
        return $list;
    } elseif(is_null($field)){
        return $list[$id];
    } else {
        return $list[$id][$field];
    }
}

/**
 * 解析UBB数据
 * @param string $data UBB字符串
 * @return string 解析为HTML的数据
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function ubb($data){
    //TODO: 待完善，目前返回原始数据
    return $data;
}

/**
 * 记录行为日志，并执行该行为的规则
 * @param string $action 行为标识
 * @param string $model 触发行为的模型名
 * @param int $record_id 触发行为的记录id
 * @param int $user_id 执行行为的用户id
 * @return boolean
 * @author huajie <banhuajie@163.com>
 */
function action_log($action = null, $model = null, $record_id = null, $user_id = null){

    //参数检查
    if(empty($action) || empty($model) || empty($record_id)){
        return '参数不能为空';
    }
    if(empty($user_id)){
        $user_id = is_login();
    }

    //查询行为,判断是否执行
    $action_info = M('Action')->getByName($action);
    if($action_info['status'] != 1){
        return '该行为被禁用或删除';
    }

    //插入行为日志
    $data['action_id']      =   $action_info['id'];
    $data['user_id']        =   $user_id;
    $data['action_ip']      =   ip2long(get_client_ip());
    $data['model']          =   $model;
    $data['record_id']      =   $record_id;
    $data['create_time']    =   NOW_TIME;

    //解析日志规则,生成日志备注
    if(!empty($action_info['log'])){
        if(preg_match_all('/\[(\S+?)\]/', $action_info['log'], $match)){
            $log['user']    =   $user_id;
            $log['record']  =   $record_id;
            $log['model']   =   $model;
            $log['time']    =   NOW_TIME;
            $log['data']    =   array('user'=>$user_id,'model'=>$model,'record'=>$record_id,'time'=>NOW_TIME);
            foreach ($match[1] as $value){
                $param = explode('|', $value);
                if(isset($param[1])){
                    $replace[] = call_user_func($param[1],$log[$param[0]]);
                }else{
                    $replace[] = $log[$param[0]];
                }
            }
            $data['remark'] =   str_replace($match[0], $replace, $action_info['log']);
        }else{
            $data['remark'] =   $action_info['log'];
        }
    }else{
        //未定义日志规则，记录操作url
        $data['remark']     =   '操作url：'.$_SERVER['REQUEST_URI'];
    }

    M('ActionLog')->add($data);

    if(!empty($action_info['rule'])){
        //解析行为
        $rules = parse_action($action, $user_id);

        //执行行为
        $res = execute_action($rules, $action_info['id'], $user_id);
    }
}

/**
 * 解析行为规则
 * 规则定义  table:$table|field:$field|condition:$condition|rule:$rule[|cycle:$cycle|max:$max][;......]
 * 规则字段解释：table->要操作的数据表，不需要加表前缀；
 *              field->要操作的字段；
 *              condition->操作的条件，目前支持字符串，默认变量{$self}为执行行为的用户
 *              rule->对字段进行的具体操作，目前支持四则混合运算，如：1+score*2/2-3
 *              cycle->执行周期，单位（小时），表示$cycle小时内最多执行$max次
 *              max->单个周期内的最大执行次数（$cycle和$max必须同时定义，否则无效）
 * 单个行为后可加 ； 连接其他规则
 * @param string $action 行为id或者name
 * @param int $self 替换规则里的变量为执行用户的id
 * @return boolean|array: false解析出错 ， 成功返回规则数组
 * @author huajie <banhuajie@163.com>
 */
function parse_action($action = null, $self){
    if(empty($action)){
        return false;
    }

    //参数支持id或者name
    if(is_numeric($action)){
        $map = array('id'=>$action);
    }else{
        $map = array('name'=>$action);
    }

    //查询行为信息
    $info = M('Action')->where($map)->find();
    if(!$info || $info['status'] != 1){
        return false;
    }

    //解析规则:table:$table|field:$field|condition:$condition|rule:$rule[|cycle:$cycle|max:$max][;......]
    $rules = $info['rule'];
    $rules = str_replace('{$self}', $self, $rules);
    $rules = explode(';', $rules);
    $return = array();
    foreach ($rules as $key=>&$rule){
        $rule = explode('|', $rule);
        foreach ($rule as $k=>$fields){
            $field = empty($fields) ? array() : explode(':', $fields);
            if(!empty($field)){
                $return[$key][$field[0]] = $field[1];
            }
        }
        //cycle(检查周期)和max(周期内最大执行次数)必须同时存在，否则去掉这两个条件
        if(!array_key_exists('cycle', $return[$key]) || !array_key_exists('max', $return[$key])){
            unset($return[$key]['cycle'],$return[$key]['max']);
        }
    }

    return $return;
}

/**
 * 执行行为
 * @param array $rules 解析后的规则数组
 * @param int $action_id 行为id
 * @param array $user_id 执行的用户id
 * @return boolean false 失败 ， true 成功
 * @author huajie <banhuajie@163.com>
 */
function execute_action($rules = false, $action_id = null, $user_id = null){
    if(!$rules || empty($action_id) || empty($user_id)){
        return false;
    }

    $return = true;
    foreach ($rules as $rule){

        //检查执行周期
        $map = array('action_id'=>$action_id, 'user_id'=>$user_id);
        $map['create_time'] = array('gt', NOW_TIME - intval($rule['cycle']) * 3600);
        $exec_count = M('ActionLog')->where($map)->count();
        if($exec_count > $rule['max']){
            continue;
        }

        //执行数据库操作
        $Model = M(ucfirst($rule['table']));
        $field = $rule['field'];
        $res = $Model->where($rule['condition'])->setField($field, array('exp', $rule['rule']));

        if(!$res){
            $return = false;
        }
    }
    return $return;
}

//基于数组创建目录和文件
function create_dir_or_files($files){
    foreach ($files as $key => $value) {
        if(substr($value, -1) == '/'){
            mkdir($value);
        }else{
            @file_put_contents($value, '');
        }
    }
}

if(!function_exists('array_column')){
    function array_column(array $input, $columnKey, $indexKey = null) {
        $result = array();
        if (null === $indexKey) {
            if (null === $columnKey) {
                $result = array_values($input);
            } else {
                foreach ($input as $row) {
                    $result[] = $row[$columnKey];
                }
            }
        } else {
            if (null === $columnKey) {
                foreach ($input as $row) {
                    $result[$row[$indexKey]] = $row;
                }
            } else {
                foreach ($input as $row) {
                    $result[$row[$indexKey]] = $row[$columnKey];
                }
            }
        }
        return $result;
    }
}

/**
 * 获取表名（不含表前缀）
 * @param string $model_id
 * @return string 表名
 * @author huajie <banhuajie@163.com>
 */
function get_table_name($model_id = null){
    if(empty($model_id)){
        return false;
    }
    $Model = M('Model');
    $name = '';
    $info = $Model->getById($model_id);
    if($info['extend'] != 0){
        $name = $Model->getFieldById($info['extend'], 'name').'_';
    }
    $name .= $info['name'];
    return $name;
}

/**
 * 获取属性信息并缓存
 * @param  integer $id    属性ID
 * @param  string  $field 要获取的字段名
 * @return string         属性信息
 */
function get_model_attribute($model_id, $group = true){
    static $list;

    /* 非法ID */
    if(empty($model_id) || !is_numeric($model_id)){
        return '';
    }

    /* 读取缓存数据 */
    if(empty($list)){
        $list = S('attribute_list');
    }

    /* 获取属性 */
    if(!isset($list[$model_id])){
        $map = array('model_id'=>$model_id);
        $extend = M('Model')->getFieldById($model_id,'extend');

        if($extend){
            $map = array('model_id'=> array("in", array($model_id, $extend)));
        }
        $info = M('Attribute')->where($map)->select();
        $list[$model_id] = $info;
        //S('attribute_list', $list); //更新缓存
    }

    $attr = array();
    foreach ($list[$model_id] as $value) {
        $attr[$value['id']] = $value;
    }

    if($group){
        $sort  = M('Model')->getFieldById($model_id,'field_sort');

        if(empty($sort)){	//未排序
            $group = array(1=>array_merge($attr));
        }else{
            $group = json_decode($sort, true);

            $keys  = array_keys($group);
            foreach ($group as &$value) {
                foreach ($value as $key => $val) {
                    $value[$key] = $attr[$val];
                    unset($attr[$val]);
                }
            }

            if(!empty($attr)){
                $group[$keys[0]] = array_merge($group[$keys[0]], $attr);
            }
        }
        $attr = $group;
    }
    return $attr;
}

/**
 * 调用系统的API接口方法（静态方法）
 * api('User/getName','id=5'); 调用公共模块的User接口的getName方法
 * api('Admin/User/getName','id=5');  调用Admin模块的User接口
 * @param  string  $name 格式 [模块名]/接口名/方法名
 * @param  array|string  $vars 参数
 */
function api($name,$vars=array()){
    $array     = explode('/',$name);
    $method    = array_pop($array);
    $classname = array_pop($array);
    $module    = $array? array_pop($array) : 'Common';
    $callback  = $module.'\\Api\\'.$classname.'Api::'.$method;
    if(is_string($vars)) {
        parse_str($vars,$vars);
    }
    return call_user_func_array($callback,$vars);
}

/**
 * 根据条件字段获取指定表的数据
 * @param mixed $value 条件，可用常量或者数组
 * @param string $condition 条件字段
 * @param string $field 需要返回的字段，不传则返回整个数据
 * @param string $table 需要查询的表
 * @author huajie <banhuajie@163.com>
 */
function get_table_field($value = null, $condition = 'id', $field = null, $table = null){
    if(empty($value) || empty($table)){
        return false;
    }

    //拼接参数
    $map[$condition] = $value;
    $info = M(ucfirst($table))->where($map);
    if(empty($field)){
        $info = $info->field(true)->find();
    }else{
        $info = $info->getField($field);
    }
    return $info;
}

/**
 * 获取链接信息
 * @param int $link_id
 * @param string $field
 * @return 完整的链接信息或者某一字段
 * @author huajie <banhuajie@163.com>
 */
function get_link($link_id = null, $field = 'url'){
    $link = '';
    if(empty($link_id)){
        return $link;
    }
    $link = M('Url')->getById($link_id);
    if(empty($field)){
        return $link;
    }else{
        return $link[$field];
    }
}

/**
 * 获取文档封面图片
 * @param int $cover_id
 * @param string $field
 * @return 完整的数据  或者  指定的$field字段值
 * @author huajie <banhuajie@163.com>
 */
function get_cover($cover_id, $field = null){
    if(empty($cover_id)){
        return false;
    }
    $picture = M('Picture')->where(array('status'=>1))->getById($cover_id);
    return empty($field) ? $picture : $picture[$field];
}

/**
 * 检查$pos(推荐位的值)是否包含指定推荐位$contain
 * @param number $pos 推荐位的值
 * @param number $contain 指定推荐位
 * @return boolean true 包含 ， false 不包含
 * @author huajie <banhuajie@163.com>
 */
function check_document_position($pos = 0, $contain = 0){
    if(empty($pos) || empty($contain)){
        return false;
    }

    //将两个参数进行按位与运算，不为0则表示$contain属于$pos
    $res = $pos & $contain;
    if($res !== 0){
        return true;
    }else{
        return false;
    }
}

/**
 * 获取数据的所有子孙数据的id值
 * @author 朱亚杰 <xcoolcc@gmail.com>
 */

function get_stemma($pids,Model &$model, $field='id'){
    $collection = array();

    //非空判断
    if(empty($pids)){
        return $collection;
    }

    if( is_array($pids) ){
        $pids = trim(implode(',',$pids),',');
    }
    $result     = $model->field($field)->where(array('pid'=>array('IN',(string)$pids)))->select();
    $child_ids  = array_column ((array)$result,'id');

    while( !empty($child_ids) ){
        $collection = array_merge($collection,$result);
        $result     = $model->field($field)->where( array( 'pid'=>array( 'IN', $child_ids ) ) )->select();
        $child_ids  = array_column((array)$result,'id');
    }
    return $collection;
}


//================add  by   dxw

function isPhone($phone){

    return strlen($phone) > 6 && preg_match("/^(010|02\d{1}|0[3-9]\d{2})-\d{7,9}(-\d+)?$/", $phone);

}

function isEmail($email){

    return strlen($email) > 6 && preg_match("/^[\w\-\.]+@[\w\-]+(\.\w+)+$/", $email);

}

function isMobile($mobile){

    return strlen($mobile) == 11 && preg_match("/^1\d{10}$/", $mobile);

}

function isDecimals($decimals){
    ///^(\d+)\.(\d+)/$
    return preg_match("/^\d{1,6}\.{0,1}\d{0,2}$/", $decimals);

}

function isNumbers($str){
    ///^(\d+)\.(\d+)/$
    return preg_match("/^\d{1,10}$/", $str);

}

//根据身份证号码获取用户的性别与出生年月
function getUsersDataByIdCard($cid){
    $data = array();
    if(strlen($cid)==18){
        $data['year'] = substr($cid,6,4);
        $data['month'] = intval(substr($cid,10,2));
        $data['day'] = intval(substr($cid,12,2));
        if(substr($cid,-2,1)%2){
            $data['sex'] = 1;
        }else	$data['sex'] = 2;
    }
    else if(strlen($cid)==15){
        $data['year'] = '19'.substr($cid,6,2);
        $data['month'] = intval(substr($cid,8,2));
        $data['day'] = intval(substr($cid,10,2));
        if(substr($cid,-1,1)%2){
            $data['sex'] = 1;
        }else	$data['sex'] = 2;
    }

    //$data['home'] = getIdcardProvince($cid);
    //$data['shengxiao'] = getShengxiao($data['year']);

    return $data;
}

//检查身份证号
function isIdcard($id_card)
{
    if(strlen($id_card) == 18)
    {
        return idcard_checksum18($id_card);
    }
    elseif((strlen($id_card) == 15))
    {
        $id_card = idcard_15to18($id_card);
        return idcard_checksum18($id_card);
    }
    else
    {
        return false;
    }
}
// 计算身份证校验码，根据国家标准GB 11643-1999
function idcard_verify_number($idcard_base)
{
    if(strlen($idcard_base) != 17)
    {
        return false;
    }
    //加权因子
    $factor = array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    //校验码对应值
    $verify_number_list = array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    $checksum = 0;
    for ($i = 0; $i < strlen($idcard_base); $i++)
    {
        $checksum += substr($idcard_base, $i, 1) * $factor[$i];
}
        $mod = $checksum % 11;
        $verify_number = $verify_number_list[$mod];
        return $verify_number;
}
// 将15位身份证升级到18位
function idcard_15to18($idcard){
    if (strlen($idcard) != 15){
        return false;
    }else{
    // 如果身份证顺序码是996 997 998 999，这些是为百岁以上老人的特殊编码
    if (array_search(substr($idcard, 12, 3), array('996', '997', '998', '999')) !== false){
    $idcard = substr($idcard, 0, 6) . '18'. substr($idcard, 6, 9);
    }else{
    $idcard = substr($idcard, 0, 6) . '19'. substr($idcard, 6, 9);
    }
    }
    $idcard = $idcard . idcard_verify_number($idcard);
    return $idcard;
    }
    // 18位身份证校验码有效性检查
    function idcard_checksum18($idcard){
    if (strlen($idcard) != 18){ return false; }
    $idcard_base = substr($idcard, 0, 17);
    if (idcard_verify_number($idcard_base) != strtoupper(substr($idcard, 17, 1))){
    return false;
    }else{
    return true;
    }
}


//add by  dxw    curl   post
function curlPost($url,$data,$decode=1,$header=array()){
    //echo $url;print_r($data);
    if(!$url){
        return array();
    }

    if($header){
        if(is_array($header)){
            $headerArr = $header;
        }
        else $headerArr = array(
            "Connection:Keep-Alive",
            "Content-Type:text/plain;charset=utf-8",
        );
    }


    $ch = curl_init ();
    curl_setopt ( $ch, CURLOPT_URL, $url );

    if($header){
        curl_setopt ($ch, CURLOPT_HTTPHEADER , $headerArr );
        curl_setopt( $ch, CURLOPT_HEADER, 0);
    }

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

    curl_setopt ($ch, CURLOPT_TIMEOUT,20);
    curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, "POST" );
    curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
    curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, FALSE );
    curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, 1 );
    curl_setopt ( $ch, CURLOPT_AUTOREFERER, 1 );
    curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );

    //curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');

    $res = curl_exec ( $ch );
    curl_close ( $ch );

    if($decode){
        $res = json_decode ( $res, true );
    }

    return $res;

}

//get
function curlGet($url, $decode = true){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HEADER,0);

    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    // 		curl_setopt($ch, CURLOPT_MAXREDIRS,5);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $json = curl_exec($ch);

    if (curl_errno($ch)) {
        throw new Exception(curl_errno($ch));
    }
    curl_close($ch);

    return $decode ? json_decode($json, true) : $json;
}

//格式化金额    去除多余的位数
function dealDecimals($money=0,$num=2){
    $big = $num + 2;
    return sprintf("%.".$num."f",substr(sprintf("%.".$big."f", $money), 0, -$num));
}

//根据条件获取用户信息
function getUsersInfo($where=1){

    $fileds = "um.id,um.username,um.password,um.email,um.mobile,m.*,c.* ";
    $list = M ( 'ucenter_member')->table("ez_ucenter_member um")
    ->join("ez_member m on um.id = m.uid","left")
    ->join("ez_company c on m.com_id = c.com_id","left")
    ->where($where)->field($fileds)->find();

    return $list;
}

//根据用户id获取用户名
function getUserNameByUid($uid,$type=1){
    if(!$uid) return '';
    $info = getUsersInfo(array('um.id'=>$uid));
    if($type==0){
        return $info;
    }
    else if($type==2){
        return $info['email'];
    }
    else if($type==3){
        return $info['realname'];
    }
    return $info['username'];
}

function getUsersResumeInfo ($uid){
    // $fileds = "um.id,um.email,m.realname,m.english_name,m.sex, m.height,m.weight,m.wx_name,m.sina_name,m.qq_name,m.phone,m.email,m.tel,m.idcardtype,m.idcard,m.birthday,m.nativeplace,m.nativeplace_city,m.nation,m.national,m.politicalstatus,m.maritalstatus,m.live_city,m.live_city_city,m.live_address,m.contact_address,m.zip,m.edu_type,m.graduate_time,m.hukou_city,m.hukou_city_city,m.hukou_city_now,m.hukou_city_now_city,m.expect_city,m.expect_city_city,m.contact_name,m.contact_phone,m.fm_name,m.fm_relation,m.fm_phone,m.fm_work,m.fm_position";
    // $list = M ( 'ucenter_member')->table("ez_ucenter_member um")
    // ->join("ez_member m on um.id = m.uid","left")
    
    // ->where($where)->field($fileds)->find();

    // return $list;

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("member")->where(array("uid"=>$uid))->select();
        
        foreach ($arr as $k=>$v){
            $list[] = array(     
                    'realname'=>$v['realname'],
                    'english_name'=>$v['english_name'],
                    'sex'=>$v['sex'],  
                    'height'=>$v['height'],
                    'weight'=>$v['weight'],
                    'phone'=>$v['phone'],
                    'email'=>$v['email_jianli'],
                    'tel'=>$v['tel'],
                    'wx_name'=>$v['wx_name'],
                    'sina_name'=>$v['sina_name'],
                    'qq_name'=>$v['qq_name'],
                    'profile'=>$v['profile'],
                    'idcardtype'=>$v['idcardtype'],
                    'idcard'=>$v['idcard'],
                    'birthday' =>$v['birthday'],
                    'nativeplace'=>$v['nativeplace'],
                    // 'nativeplace_city'=>$v['nativeplace_city'],
                    'nation'=>$v['nation'],
                    'national'=>$v['national'],
                    'politicalstatus'=>$v['politicalstatus'],
                    'maritalstatus'=>$v['maritalstatus'], 
                    'live_city'=>$v['live_city'],
                    // 'live_city_city'=>$v['live_city_city'],
                    'live_address'=>$v['live_address'],
                    'contact_address'=>$v['contact_address'],
                    'zip'=>$v['zip'],
                    'edu'=>$v['edu'],
                    'edu_type'=>$v['edu_type'],
                    'graduate_time'=>$v['graduate_time'],
                    'hukou_city'=>$v['hukou_city'],
                    // 'hukou_city_city'=>$v['hukou_city_city'],
                    'hukou_city_now'=>$v['hukou_city_now'],
                    // 'hukou_city_now_city'=>$v['hukou_city_now_city'],
                    'expect_city'=>$v['expect_city'],
                    // 'expect_city_city'=>$v['expect_city_city'],
                    'contact_name'=>$v['contact_name'],
                    'contact_phone'=>$v['contact_phone'],
                    'fm_name'=>$v['fm_name'],
                    'fm_relation'=>$v['fm_relation'],
                    'fm_phone'=>$v['fm_phone'],
                    'fm_work'=>$v['fm_work'],
                    'fm_position'=>$v['fm_position'],
                    // 'createTime'=>$v['createTime'],
                    // 'education'=>$v['education'],
                    // 'endYear'=>$v['endYear'],
                    // 'endDate'=>$v['endYear'],
                    // 'schoolName'=>$v['schoolName'],
                    // 'professional'=>$v['professional'],
                    // 'resumeId'=>$v['uid'],
                    // 'schoolBadge'=>$v['schoolBadge'],
                    // 'isDel'=>$v['isDel'],
                    // 'reward_punish'=>$v['reward_punish'],
                    // 'whetherGraduate'=>($v['endYear']>date("Y"))?0:1,//是否毕业
                    // 'id'=>$v['id'],
            );
        }

        return $list;
    }
}

//根据条件获取用户列表
function getUsersListByCon($where=1,$limit=0,$size=10,$order="um.id desc"){

    $fileds = "um.id,um.username,um.password,um.email,um.mobile,m.*,c.*  ";
    $list = M ( 'ucenter_member')->table("ez_ucenter_member um")
    ->join("ez_member m on um.id = m.id","left")
    ->join("ez_company c on m.com_id = c.com_id","left")
    ->where($where)->field($fileds)->order($order)->limit($limit,$size)->select();

    return $list;

}

//日期格式化
function showDate($time='',$rule="Y-m-d H:i:s"){
    if($time){
        return date($rule,$time);
    }
    return '';
}

//获取举报状态
function getReportStatus($key){
    $array = array(
        '1'=>"已处理",
        '0'=>"未处理",
    );
    if($key=="all"){
        return $array;
    }
    else return $array[$key];
}

//获取审核状态
function getCheckStatus($key){
    $array = array(
        '1'=>"通过",
        '0'=>"审核中",
        '-1'=>"不通过",
    );
    if($key=="all"){
        return $array;
    }
    else return $array[$key];
}

//读取新闻类型      1首页轮播2首页右侧2卖车右侧4资讯右侧
function getAdvType($id){
    $array = array(
        '1'=>"首页轮播图",
        '2'=>"宣讲会轮播图",

    );
    if($id=="all"){
        return $array;
    }
    else return $array[$id];
}


//举报原因
function getReportReason($key='all'){
    $array = array(
        '1'=>"薪资不真实",
        '2'=>"工作经验或学历要求不真实",
        '3'=>"公司信息不真实",
        '4'=>"其他",
    );
    if($key=="all"){
        return $array;
    }
    else if($key){
        return $array[$key];
    }
    else {
        return '';
    }
}

//配置发展阶段
function getFazhanJieduan($key='all'){
    $array = array(
        '1'=>"初创型",
        '2'=>"成长型",
        '3'=>"成熟型",
        '4'=>"已上市 ",
    );
    if($key=="all"){
        return $array;
    }
    else if($key){
        return $array[$key];
    }
    else {
        return '';
    }
}

//获取行业id
function getHangyeLingyuById($id){

    //$arr = getHangyeLingyu();
    $arr = require DATA_PATH.'webCategoryAll.php';
    /* foreach ($arr as $k=>$v){
        if($k==$id){
            return $v;
        }
    } */
    return $arr[$id]['title'];

}


//获取子类id
function getHangyeSonIds($bgid){
    $ids = array();
    if($bgid){
        $arr = require DATA_PATH.'webCategory.php';
        if($arr[$bgid]['sub']){
            foreach ($arr[$bgid]['sub'] as $k=>$v){
                $ids[] = $v['id'];
            }
        }

    }
    return $ids;
}


//会员类型
function getUserType($key='all'){
    $array = array(
        '0'=>"个人",
        '1'=>"企业",
    	'99'=>"管理员",
    );
    if($key=="all"){
        return $array;
    }
    else return $array[$key];
}

//配置行业领域
/* function getHangyeLingyu($key='all'){
    $array = array(
        1=>'互联网·游戏·软件',
        2=>'电子·通信·硬件',
        3=>'房地产·建筑·物业',
        4=>'金融',
        5=>'消费品',
        6=>'汽车·机械·制造',
        7=>'服务·外包·中介',
        8=>'广告·传媒·教育·文化',
        9=>'交通·贸易·物流',
        10=>'制药·医疗',
        11=>'能源·化工·环保',
        12=>'政府/公共事业/非营利机构',
    );
    if($key=="all"){
        return $array;
    }
    else if($key){
        return $array[$key];
    }
    else {
        return '';
    }
} */

//根据分类id获取名称
function getCatNameById($id){

    $arr = require DATA_PATH.'webCategoryAll.php';
    if($arr[$id]){
        return $arr[$id]['title'];
    }

    return '';
}



//根据步骤  获取分值
function getResumeStepScore($key='all'){
    $array = array(
        'score_touxiang'=>5,
        'score_jiben'=>20,
        'score_jingyan'=>25,
        'score_jiaoyu'=>25,
        'score_xiangmu'=>5,
        'score_zuopin'=>5,
        'score_jineng'=>5,
        'score_ziwo'=>5,
        'score_custom'=>5,

    );
    if($key=="all"){
        return $array;
    }
    else if($key){
        return intval($array[$key]);
    }
    else {
        return 0;
    }
}

//统计简历总分
function getResumeScore($user){
    if(!$user) return 0;
    $score = intval($user['score_touxiang']) +  intval($user['score_jiben']) + intval($user['score_jingyan'])+
    intval($user['score_jiaoyu'])+intval($user['score_xiangmu']) + intval($user['score_zuopin']) +
     intval($user['score_jineng'])+intval($user['score_ziwo'])+intval($user['score_custom']);
    return  intval($score);
}


//必须完成基本三项方可投递简历
function checkUsersFinish($user){
    if(!$user) return 0;
    $score = intval(intval($user['score_jiben']) + intval($user['score_jingyan'])+
    intval($user['score_jiaoyu']));
    if( intval($user['score_jiben']) && intval($user['score_jingyan']) && intval($user['score_jiaoyu']) ){
        return 1;
    }
    else return 0;
    //return  intval($score);
}


//获取我的完善路径
function getResumeStepNext($user){
    if(!$user) return 0;
    $data = 0;
    if($user['score_jiben']==0){
        $data = array(
            'key'=>'basicInfo',
            'memo'=>'请先完善个人基本信息，且完善后才可投递简历哦！',
        );
    }
    else if($user['score_jingyan']==0){
        $data = array(
            'key'=>'workExperience',
            'memo'=>'工作经历最能体现自己的工作能力，且完善后才可投递简历哦！',
        );
    }
    else if($user['score_jiaoyu']==0){
        $data = array(
            'key'=>'educationalBackground',
            'memo'=>'教育背景可以充分体现你的学习和专业能力，且完善后才可投递简历！',
        );
    }
    else if($user['score_xiangmu']==0){
        $data = array(
            'key'=>'projectExperience',
            'memo'=>'项目经历可以展示你的工作能力，是HR筛选人才的重要依据！',
        );
    }
    else if($user['score_zuopin']==0){
        $data = array(
            'key'=>'worksShow',
            'memo'=>'秀出自己的优秀作品，一目了然呈现自己的工作水平！',
        );
    }
    else if($user['score_miaoshu']==0){
        $data = array(
            'key'=>'selfDescription',
            'memo'=>'客观的评价自己，让企业发现你的好！',
        );
    }
    else if($user['score_qiwang']==0){
        $data = array(
            'key'=>'expectPosition',
            'memo'=>'填写期望工作才能搜索，且完善后才可投递简历哦！',
        );
    }
    else if($user['score_jineng']==0){
        $data = array(
            'key'=>'skillEvaluate',
            'memo'=>'展示自己最擅长的技能，在专业技能上彰显能力！',
        );
    }
    else if($user['score_custom']==0){
        $data = array(
            'key'=>'complete',
            'memo'=>'哇！你的简历已经相当完善了，赶紧去投递你中意的职位吧！',
        );
    }
    else {
        $data = array(
            'key'=>'complete',
            'memo'=>"哇！你的简历已经相当完善了，赶紧去投递你中意的职位吧！"
        );
    }
    return  $data;
}

//广告类型
function getAdType($key='all'){
    $array = array(
        '1'=>"系统广告",
        '2'=>"轮播广告",
    );
    if($key=="all"){
        return $array;
    }
    else if($key){
        return $array[$key];
    }
    else {
        return '';
    }
}

//获取bool
function getBool($key){
    $array = array(
        '1'=>"是",
        '0'=>"否",
    );
    if(isset($key)){
        return $array[$key];
    }
    else return $array;
}

//获取通用状态
function getStatus($key){
    $array = array(
        '1'=>"启用",
        '0'=>"禁用",
    );
    if(isset($key)){
        return $array[$key];
    }
    else return $array;
}

//获取会员状态-1禁用0刚注册1待激活2待完善资料100资料已完善
function getUsersStatus($id){
    $array = array(
        '0'=>"刚注册",
        '1'=>"待激活邮箱",
        '2'=>"待完善资料",
        '100'=>"正常",
        '-1'=>"禁用"
    );
    if(isset($id)){
        return $array[$id];
    }
    else return $array;
}

//读取新闻类型      0单页面1新闻2通知公告3求职礼包4帮助信息
function getNewsType($id){
    $array = array(
        '1'=>"新闻报道",
        '2'=>"通知公告",
        '3'=>"求职礼包",
        '4'=>"帮助信息",
        '10'=>"单页面",
    );
    if($id=="all"){
        return $array;
    }
    else return $array[$id];
}

//读取新闻类型      0单页面1新闻2通知公告3求职礼包4帮助信息
function getFeedbackStatus($id){
    $array = array(
        '1'=>"已处理",
        '0'=>"未处理",
    );
    if($id=="all"){
        return $array;
    }
    else return $array[$id];
}


//定义产生的会员halt
function getUserCode($num=6){
    $str = '';
    $arr = range("0", "9") + range("a", "z");
    for( $i=0;$i<$num;$i++ ){
        $str .= $arr[array_rand($arr)];
    }
    return $str;
}

//获取年
function getYear($start=1960,$end='',$order=0){
    if(!$end){
        $end = date("Y");
    }
    $year = array();
    if($order==1){
        for($i=$end;$i>=$start;$i--){
            $year[] = $i;
        }
    }
    else{
        for($i=$start;$i<=$end;$i++){
            $year[] = $i;
        }
    }

    return $year;
}

//获取年月日
function getYMD($start='',$stop=''){
    $array = array();
    if(!$start) $start = '1960';
    if(!$stop) $stop = date("Y");
    for($i=$start;$i<=$stop;$i++){
        $array['1'][$i] = $i;
    }
    for($i=1;$i<13;$i++){
        $array['2'][$i] = $i<10?"0".$i:$i;
    }
    for($i=1;$i<32;$i++){
        $array['3'][$i] = $i<10?"0".$i:$i;
    }
    return $array;
}

//输出日期
function showDay($time,$rule='Y-m-d H:i:s'){
    if(!$time) return ;
    return date($rule,$time);
}


//输出性别
function showSex($sex){
    $array = array(
        1=>"男",
        2=>"女",
        0=>"未知"
    );
    if(!$array[$sex]) return "未知";
    return $array[$sex];
}




//添加操作日志
function addUsersOptLog($type="100",$memo="不详",$mod='Home',$ext=array() ){
    if( $mod=='Admin' ){
        $uid = $_SESSION['admin_id'];
        $username = $_SESSION['admin_username'];
    }
    else {
        $uid = $_SESSION['uid'];
        $username = $_SESSION['username'];
    }
    $time = time();
    $ip = getIp();
    $data = array(
        'type'=>$type,
        'uid'=>$uid,
        'username'=>$username,
        'mod'=>$mod,
        'memo'=>$memo,
        'addtime'=>$time,
        'ip'=>$ip,
        'for_uid'=>$ext[for_uid],
        'for_username'=>$ext[for_username],
    );
    $rs = M("opt_log")->add($data);

    if($rs){
        return true;
    }
    else return false;
}

//格式化动态
function getRuleFeed($content,$time='',$title='帖子'){

    if(!$content){
        return $content;
    }

    $content = str_replace("{title}", $title, $content);
    $ctime = '';
    if($time){
        $ctime = getLongTimeSpace($time);
    }

    $content = str_replace("{time}", $ctime, $content)
    ;
    return $content;

}

//根据汉字获取每个字母的首字母
function getFirstLetter($str){
    $fchar = ord($str{0});
    if($fchar >= ord("A") and $fchar <= ord("z") )return strtoupper($str{0});
    $s1 = iconv("UTF-8","gb2312", $str);
    $s2 = iconv("gb2312","UTF-8", $s1);
    if($s2 == $str){$s = $s1;}
    else{$s = $str;}
    $asc = ord($s{0}) * 256 + ord($s{1}) - 65536;
    if($asc >= -20319 and $asc <= -20284) return "a";
    if($asc >= -20283 and $asc <= -19776) return "b";
    if($asc >= -19775 and $asc <= -19219) return "c";
    if($asc >= -19218 and $asc <= -18711) return "d";
    if($asc >= -18710 and $asc <= -18527) return "e";
    if($asc >= -18526 and $asc <= -18240) return "f";
    if($asc >= -18239 and $asc <= -17923) return "g";
    if($asc >= -17922 and $asc <= -17418) return "i";
    if($asc >= -17417 and $asc <= -16475) return "j";
    if($asc >= -16474 and $asc <= -16213) return "k";
    if($asc >= -16212 and $asc <= -15641) return "l";
    if($asc >= -15640 and $asc <= -15166) return "m";
    if($asc >= -15165 and $asc <= -14923) return "n";
    if($asc >= -14922 and $asc <= -14915) return "o";
    if($asc >= -14914 and $asc <= -14631) return "p";
    if($asc >= -14630 and $asc <= -14150) return "q";
    if($asc >= -14149 and $asc <= -14091) return "r";
    if($asc >= -14090 and $asc <= -13319) return "s";
    if($asc >= -13318 and $asc <= -12839) return "t";
    if($asc >= -12838 and $asc <= -12557) return "w";
    if($asc >= -12556 and $asc <= -11848) return "x";
    if($asc >= -11847 and $asc <= -11056) return "y";
    if($asc >= -11055 and $asc <= -10247) return "z";
    return null;
}

function getFirstChar($zh){
    $ret = "";
    $s1 = iconv("UTF-8","gb2312", $zh);
    $s2 = iconv("gb2312","UTF-8", $s1);
    if($s2 == $zh){$zh = $s1;}
    for($i = 0; $i < strlen($zh); $i++){
        $s1 = substr($zh,$i,1);
        $p = ord($s1);
        if($p > 160){
            $s2 = substr($zh,$i++,2);
            $ret .= getFirstLetter($s2);
        }else{
            $ret .= $s1;
        }
    }
    return $ret;
}

//读取热门关键词
function getHotKeywords(){
    $keywords = C("HOT_KEYWORDS");
    $keywords = str_replace("；", ";", $keywords);
    $arr = array();
    if($keywords){
        $arr = explode(";", $keywords);
    }
    return $arr;
}

function get_extension($file)
{
    return pathinfo($file, PATHINFO_EXTENSION);
}


// 格式时间    离现在已经多久了
function getLongTimeSpace($time){

    if(!$time) return '';
    $now = time();
    $space = $now - $time;
    if($space<60){
        $flag = $space.'秒';

    }
    elseif($space<3600){
        $flag = intval($space/60).'分';
    }
    elseif($space<60*60*24){
        $flag = intval($space/3600).'小时';
    }
    else {
        $flag = intval($space/(3600*24)).'天';
    }
    return $flag;
}


//获取地区
/* function getAddress($type='',$limit=""){

    $address = require(DATA_PATH.'SecAddress.php');

    if($limit=="all"){
        $arr[-1] = array (
            'id' => '-1',
            'name' => '不限',
            'level' => '1',
            'usetype' => '3',
            'upid' => '0',
            'displayorder' => '0',
            'childs' => array (-2 => '不限')
        );
        $address = $arr + $address;
    }
    if($type=='json'){
        return json_encode($address);
    }

    return $address;
}

//获取三级区域
function getThirdAddress($type='',$limit=""){

    $address = require(DATA_PATH.'ThirdAddress.php');

    if($limit=="all"){
        $arr[-1] = array (
            'id' => '-1',
            'name' => '不限',
            'level' => '1',
            'usetype' => '3',
            'upid' => '0',
            'displayorder' => '0',
            'childs' => array (-2 => '不限')
        );
        $address = $arr + $address;
    }
    if($type=='json'){
        return json_encode($address);
    }

    return $address;
}
 */

//获取区域城市
function getAreaCitys(){

    $address = require(DATA_PATH.'area_city.php');
    return $address;
}

//返回城市学校二级
function getSchool($type='',$limit=""){

	$address = require(DATA_PATH.'citySchool.php');

	if($limit=="all"){
		$arr[0] = array (
			'cid' => '0',
			'name' => '不限',
			'type' => '1',
			'pid' => '1',
			'sub' => array (0 =>array('sid'=>0,"name"=>'不限'))
		);
		$address = $arr + $address;
	}
	if($type=='json'){
		return json_encode($address);
	}

	return $address;
}

//根据id获取学校名称
function getSchoolById($id){
	if(!$id) return '';
	$address = require(DATA_PATH.'AllSchool.php');
	return $address[$id]['name'];
}

//返回省市二级
function getAddress($type='',$limit=""){

	$address = require(DATA_PATH.'province_city.php');

	if($limit=="all"){
		$arr[0] = array (
			'aid' => '0',
			'name' => '不限',
			'type' => '1',
			'usetype' => '3',
			'pid' => '1',
			'displayorder' => '0',
			'sub' => array (0 => array("aid"=>0,"pid"=>1,"name"=>"不限"))
		);
		$address = $arr + $address;
	}
	if($type=='json'){
		return json_encode($address);
	}

	return $address;
}

//根据id获取城市名称
function getPlaceById($id){
    if(!$id) return '';
    $address = require(DATA_PATH.'AllAddress.php');
    return $address[$id]['name'];
}

//根据拼音获取城市名称
function getPlaceByPinyin($py){
    if(!$py) return '';
    $address = require(DATA_PATH.'AllAddress.php');
    foreach ($address as $k=>$v){
        if($v['pinyin']==$py){
            return $v['name'];
        }
    }
    return '';
}

//检查城市名称是否存在
function CheckPlaceName($name){
    if(!$name) return false;
    $address = require(DATA_PATH.'AllAddress.php');
    foreach ($address as $k=>$v){
        if($v['name']==$name){
            return true;
        }
    }
    return false;
}

//根据用户uid返回地址
function getAddressById($uid){
    if(!$uid) return '';
    $info = M("users_info")->where(array('uid'=>$uid))->find();
    $province = getPlaceById($info['province']);
    $city = getPlaceById($info['city']);
    $town = getPlaceById($info['town']);
    $address = $province."&nbsp;".$city."&nbsp".$town;
    return $address;
}

//==================上传图  裁剪=============================

function cutZoomImages($new_pic){
    list($width, $height) = getimagesize($_POST["imageSource"]);
    $viewPortW = $_POST["viewPortW"];
    $viewPortH = $_POST["viewPortH"];
    $pWidth = $_POST["imageW"];
    $pHeight =  $_POST["imageH"];
    $endexplode = explode(".",$_POST["imageSource"]);
    $ext = end($endexplode);
    $function = returnCorrectFunction($ext);
    $image = $function($_POST["imageSource"]);
    $width = imagesx($image);
    $height = imagesy($image);
    // Resample
    $image_p = imagecreatetruecolor($pWidth, $pHeight);
    setTransparency($image,$image_p,$ext);
    imagecopyresampled($image_p, $image, 0, 0, 0, 0, $pWidth, $pHeight, $width, $height);
    imagedestroy($image);
    $widthR = imagesx($image_p);
    $hegihtR = imagesy($image_p);

    $selectorX = $_POST["selectorX"];
    $selectorY = $_POST["selectorY"];

    if($_POST["imageRotate"]){
        $angle = 360 - $_POST["imageRotate"];
        $image_p = imagerotate($image_p,$angle,0);

        $pWidth = imagesx($image_p);
        $pHeight = imagesy($image_p);

        //print $pWidth."---".$pHeight;

        $diffW = abs($pWidth - $widthR) / 2;
        $diffH = abs($pHeight - $hegihtR) / 2;

        $_POST["imageX"] = ($pWidth > $widthR ? $_POST["imageX"] - $diffW : $_POST["imageX"] + $diffW);
        $_POST["imageY"] = ($pHeight > $hegihtR ? $_POST["imageY"] - $diffH : $_POST["imageY"] + $diffH);


    }


    $dst_x = $src_x = $dst_y = $src_y = 0;

    if($_POST["imageX"] > 0){
        $dst_x = abs($_POST["imageX"]);
    }else{
        $src_x = abs($_POST["imageX"]);
    }
    if($_POST["imageY"] > 0){
        $dst_y = abs($_POST["imageY"]);
    }else{
        $src_y = abs($_POST["imageY"]);
    }


    $viewport = imagecreatetruecolor($_POST["viewPortW"],$_POST["viewPortH"]);
    setTransparency($image_p,$viewport,$ext);

    imagecopy($viewport, $image_p, $dst_x, $dst_y, $src_x, $src_y, $pWidth, $pHeight);
    imagedestroy($image_p);


    $selector = imagecreatetruecolor($_POST["selectorW"],$_POST["selectorH"]);
    setTransparency($viewport,$selector,$ext);
    imagecopy($selector, $viewport, 0, 0, $selectorX, $selectorY,$_POST["viewPortW"],$_POST["viewPortH"]);

    //$file = "tmp/test".time().".".$ext;
    parseImage($ext,$selector,WEB_PATH.$new_pic);
    imagedestroy($viewport);

    return true;
}


function determineImageScale($sourceWidth, $sourceHeight, $targetWidth, $targetHeight) {
    $scalex =  $targetWidth / $sourceWidth;
    $scaley =  $targetHeight / $sourceHeight;
    return min($scalex, $scaley);
}

function returnCorrectFunction($ext){
    $function = "";
    switch($ext){
        case "png":
            $function = "imagecreatefrompng";
            break;
        case "jpeg":
            $function = "imagecreatefromjpeg";
            break;
        case "jpg":
            $function = "imagecreatefromjpeg";
            break;
        case "gif":
            $function = "imagecreatefromgif";
            break;
    }
    return $function;
}

function parseImage($ext,$img,$file = null){
    switch($ext){
        case "png":
            imagepng($img,($file != null ? $file : ''));
            break;
        case "jpeg":
            imagejpeg($img,($file ? $file : ''),90);
            break;
        case "jpg":
            imagejpeg($img,($file ? $file : ''),90);
            break;
        case "gif":
            imagegif($img,($file ? $file : ''));
            break;
    }
}

function setTransparency($imgSrc,$imgDest,$ext){

    if($ext == "png" || $ext == "gif"){
        $trnprt_indx = imagecolortransparent($imgSrc);
        // If we have a specific transparent color
        if ($trnprt_indx >= 0) {
            // Get the original image's transparent color's RGB values
            $trnprt_color    = imagecolorsforindex($imgSrc, $trnprt_indx);
            // Allocate the same color in the new image resource
            $trnprt_indx    = imagecolorallocate($imgDest, $trnprt_color['red'], $trnprt_color['green'], $trnprt_color['blue']);
            // Completely fill the background of the new image with allocated color.
            imagefill($imgDest, 0, 0, $trnprt_indx);
            // Set the background color for new image to transparent
            imagecolortransparent($imgDest, $trnprt_indx);
        }
        // Always make a transparent background color for PNGs that don't have one allocated already
        elseif ($ext == "png") {
            // Turn off transparency blending (temporarily)
            imagealphablending($imgDest, true);
            // Create a new transparent color for image
            $color = imagecolorallocatealpha($imgDest, 0, 0, 0, 127);
            // Completely fill the background of the new image with allocated color.
            imagefill($imgDest, 0, 0, $color);
            // Restore transparency blending
            imagesavealpha($imgDest, true);
        }

    }
}
//=====================end=======================================
function getUsersEmptyInfo($uid){

    // $fileds = "um.id,m.english_name,m.sina_name,m.wx_name,m.qq_name,m.national,m.contact_address,edu.uid,edu.school_city,edu.gpa_score,edu.tutor_name,edu.tutor_phone,w.uid,w.salary_month,w.reasons,w.reterence_name,w.reterence_relation,w.eterence_company,w.reterence_position,w.reterence_phone,p.uid,p.projectNumber,p.reterenceName,p.reterencePhone,te.uid,te.trainingPlace";
    // $list = M ( 'ucenter_member')->table("ez_ucenter_member um")
    // ->join("ez_member m on um.id = m.uid","left")
    // ->join("ez_edu_experience edu on um.id = edu.uid","left")
    // ->join("ez_work_experience w on um.id = w.uid","left")
    // ->join("ez_pro_experience p on um.id = p.uid","left")
    // ->join("ez_training_experience te on um.id = te.uid","left")
    // ->where(array("um.id"=>$uid))->field($fileds)->find();
    // return $list;

    $info_list = array();
    $info_arr = M("member")->where(array("uid"=>$uid))->select();
    foreach ($info_arr as $k=>$v){
        $info_list[] = array(     
            'english_name'=>$v['english_name'],
            'wx_name'=>$v['wx_name'],
            'sina_name'=>$v['sina_name'],
            'qq_name'=>$v['qq_name'],
            'national'=>$v['national'],
            'contact_address'=>$v['contact_address'],      
        );
    }

    $work_list = array();
    $work_arr = M("work_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($work_arr as $k=>$v){
        $work_list[] = array(
            'salary_month'=>$v['salary_month'],
            'reasons'=>$v['reasons'],
            'reterence_name'=>$v['reterence_name'],
            'reterence_relation'=>$v['reterence_relation'],
            'reterence_company'=>$v['reterence_company'],
            'reterence_position'=>$v['reterence_position'],
            'reterence_phone'=>$v['reterence_phone'],
        );
    }
   
    $edu_list = array();
    $edu_arr = M("edu_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($edu_arr as $k=>$v){
        $edu_list[] = array(   
            'school_city'=>$v['school_city'],
            'gpa_score'=>$v['gpa_score'],
            'tutor_name'=>$v['tutor_name'],
            'tutor_phone'=>$v['tutor_phone'],
        );
    }

    $pro_list = array();
    $pro_arr = M("pro_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($pro_arr as $k=>$v){
        $pro_list[] = array(
            'projectNumber'=>$v['projectNumber'],
            'reterenceName'=>$v['reterenceName'],
            'reterencePhone'=>$v['reterencePhone'],
        );
    }

    $training_list = array();
    $training_arr = M("training_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($training_arr as $k=>$v){
        $training_list[] = array( 
            'trainingPlace'=>$v['trainingPlace'],
        );
    }

    $empty_num =array();
    $lowuser_num = array();
    $empty_num[0] = NumberCounter(0,0,$edu_list);
    $lowuser_num[0] = NumberCounterAll(0,1,$edu_list);
    $empty_num[1] = NumberCounter(0,0,$work_list);
    $lowuser_num[1] = NumberCounterAll(0,1,$work_list);
    $empty_num[2] = NumberCounter(0,0,$pro_list);
    $lowuser_num[2] = NumberCounterAll(0,1,$pro_list);
    $empty_num[3] = NumberCounter(0,0,$training_list);
    $lowuser_num[3] = NumberCounterAll(0,1,$training_list);
    $empty_num[4] = count(array_filter($info_list[0]));
    $lowuser_num[4] =  count($info_list[0]);
    
    $all = array_sum($lowuser_num);
    $empty = array_sum($empty_num);
    $num_sum = array();
    $num_sum[0] = $all;
    $num_sum[1] = $empty;
    
    return  $num_sum;  
}

function NumberCounter($a,$b,$list){
    //$list = array();
    //  if(!$uid){
    //        $uid = $this->uid;
    //    }
    // $list = getUsersEduExperience($uid);
    //$num_counter = count($list);
    $list_num= count($list);
    for ($i=0; $i < $list_num ; $i++) { 
        $list_arr[$i] = count(array_filter($list[$i])); 
    } 
    $list_num = $list_num*$a; 
    $list_arr = array_sum($list_arr);

    $num_counter = $list_arr-$list_num;

    // $list_tnum = count($list, true); 
    // $list_tarr = $b*count($list); 
    // $num_counter[1] = $list_tnum-$list_tarr;

    return $num_counter;
}
function NumberCounterAll($a,$b,$list){
    $list_tnum = count($list, true); 
    $list_tarr = $b*count($list); 
    $num = $list_tnum-$list_tarr;

    return $num;
}

function getUsersAllInfo($uid){
    $list = array();
    if(!$uid){
        return $list;
    }

    // $exp_list =getUsersWorkExperience($uid);
    // $edu_list =getUsersEduExperience($uid);
    // $pro_list =getUsersProExperience($uid);

    // $practice_list =getSchoolPractice($uid);
    // $schoolclub_list =getUsersSchoolClub($uid);
    // $schoolawards_list =getUsersSchoolAwards($uid);
    // $certificate_list =getUsersCertificate($uid);
    // $trainingexperience_list =getUsersTrainingExperience($uid);
    // $otherinfo_list =getUsersotherInfo($uid);
    $info_list = array();
    $info_arr = M("member")->where(array("uid"=>$uid))->select();
    foreach ($info_arr as $k=>$v){
        $info_list[] = array(     
                'realname'=>$v['realname'],
                // 'english_name'=>$v['english_name'],
                'sex'=>$v['sex'],  
                'height'=>$v['height'],
                'weight'=>$v['weight'],
                // 'wx_name'=>$v['wx_name'],
                // 'sina_name'=>$v['sina_name'],
                // 'qq_name'=>$v['qq_name'],
                'phone'=>$v['phone'],
                'email'=>$v['email_jianli'],
                'tel'=>$v['tel'],
                'idcardtype'=>$v['idcardtype'],
                'idcard'=>$v['idcard'],
                'birthday' =>$v['birthday'],
                'nativeplace'=>$v['nativeplace'],
                // 'nativeplace_city'=>$v['nativeplace_city'],
                'nation'=>$v['nation'],
                // 'national'=>$v['national'],
                'politicalstatus'=>$v['politicalstatus'],
                'maritalstatus'=>$v['maritalstatus'], 
                'live_city'=>$v['live_city'],
                // 'live_city_city'=>$v['live_city_city'],
                'live_address'=>$v['live_address'],
                // 'contact_address'=>$v['contact_address'],
                'zip'=>$v['zip'],
                'edu_type'=>$v['edu_type'],
                'graduate_time'=>$v['graduate_time'],
                'hukou_city'=>$v['hukou_city'],
                // 'hukou_city_city'=>$v['hukou_city_city'],
                'hukou_city_now'=>$v['hukou_city_now'],
                // 'hukou_city_now_city'=>$v['hukou_city_now_city'],
                'expect_city'=>$v['expect_city'],
                // 'expect_city_city'=>$v['expect_city_city'],
                'contact_name'=>$v['contact_name'],
                'contact_phone'=>$v['contact_phone'],
                'fm_name'=>$v['fm_name'],
                'fm_relation'=>$v['fm_relation'],
                'fm_phone'=>$v['fm_phone'],
                'fm_work'=>$v['fm_work'],
                'fm_position'=>$v['fm_position'],
        );
    }


    $exp_list = array();
    $exp_arr = M("work_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($exp_arr as $k=>$v){
        $exp_list[] = array(
            'companyName'=>$v['companyName'],
            'positionName'=>$v['positionName'],
            'startDate'=>$v['startDate'],
            'endDate'=>$v['endDate'],
            'workContent'=>$v['workContent'],
            'jobContent'=>$v['jobContent'],
            'company_property'=>$v['company_property'],
            'company_size'=>$v['company_size'],
            'company_cat'=>$v['company_cat'],
            'work_cat'=>$v['work_cat'],
            'department'=>$v['department'],
            'work_city'=>$v['work_city'],  
        );
    }

    $edu_list = array();
    $edu_arr = M("edu_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($edu_arr as $k=>$v){
        $edu_list[] = array(
            'education'=>$v['education'],
            'endYear'=>$v['endYear'],
            'startYear'=>$v['startYear'],
            'schoolName'=>$v['schoolName'],
            'professional'=>$v['professional'],
            'degree'=>$v['degree'],
            'academy'=>$v['academy'],
            'major'=>$v['major'],
            'class_ranking'=>$v['class_ranking'],
            'professional_ranking'=>$v['professional_ranking'],
            'professional_describe'=>$v['professional_describe'],
        );
    }

    $pro_list = array();
    $pro_arr = M("pro_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($pro_arr as $k=>$v){
        $pro_list[] = array(
            'positionName'=>$v['positionName'],
            'projectName'=>$v['projectName'],
            'projectRemark'=>$v['projectRemark'],
            'startDate'=>$v['startDate'],
            'endDate'=>$v['endDate'],
            'projectDuty'=>$v['projectDuty'],
        );
    }
 
    $training_list = array();
    $training_arr = M("training_experience")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($training_arr as $k=>$v){
        $training_list[] = array(
            'trainingName'=>$v['trainingName'],
            'trainingDes'=>$v['trainingDes'],
            'trainingCompany'=>$v['trainingCompany'],
            'startDate'=>$v['startDate'],
            'endDate'=>$v['endDate'],
            'certificateName'=>$v['certificateName'],
        );
    }

    $practice_list = array();
    $practice_arr = M("school_practice")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($practice_arr as $k=>$v){
        $practice_list[] = array(
            'praCompanyName'=>$v['praCompanyName'],
            'practiceDes'=>$v['practiceDes'],
            'practicePosition'=>$v['practicePosition'],
            'practiceDuty'=>$v['practiceDuty'],
            'endDate'=>$v['endDate'],
            'startDate'=>$v['startDate'],
        );
    }

    $schoolclub_list = array();
    $schoolclub_arr = M("school_club")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($schoolclub_arr as $k=>$v){
        $schoolclub_list[] = array(
            'schClubName'=>$v['schClubName'],
            'schClubLevel'=>$v['schClubLevel'],
            'positionName'=>$v['positionName'],
            'workDes'=>$v['workDes'],
            'startDate'=>$v['startDate'],
            'endDate'=>$v['endDate'],
        
        );
    }

    $schoolawards_list = array();

    $schoolawards_arr = M("school_awards")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($schoolawards_arr as $k=>$v){
        $schoolawards_list[] = array(
            'awardsName'=>$v['awardsName'],
            'awardsType'=>$v['awardsType'],
            'awardsLevel'=>$v['awardsLevel'],
            'awardsDate'=>$v['awardsDate'],
            'awardsDes'=>$v['awardsDes'],
        );
    }

    $certificate_list = array();
    $certificate_arr = M("certificate")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($certificate_arr as $k=>$v){
        $certificate_list[] = array(
            'certificateName'=>$v['certificateName'],
            'getDate'=>$v['getDate'],
            'certificateDes'=>$v['certificateDes'],
            'issuing'=>$v['issuing'],
        );
    }
    
    $otherinfo_list = array();
    $otherinfo_arr = M("other_info")->where(array("uid"=>$uid))->order("id desc")->select();
    foreach ($otherinfo_arr as $k=>$v){
        $otherinfo_list[] = array(
            'selfIntro'=>$v['selfIntro'],
            'skill'=>$v['skill'],
            'hobbies'=>$v['hobbies'],
            'achievement'=>$v['achievement'],
            'profile'=>$v['profile'],
        );
    }
       
        
       
   
    // $exp_list =getUsersWorkExperience($uid);
    // $edu_list =getUsersEduExperience($uid);
    // $pro_list =getUsersProExperience($uid);

    // $practice_list =getSchoolPractice($uid);
    //$schoolclub_list =getUsersSchoolClub($uid);
   // $schoolawards_list =getUsersSchoolAwards($uid);
    //$certificate_list =getUsersCertificate($uid);
   // $trainingexperience_list =getUsersTrainingExperience($uid);
    //$otherinfo_list =getUsersotherInfo($uid);


    $counterAll = array();
    $counterEmpty = array();
    $counterEmpty[0] = NumberCounter(0,0,$edu_list);
    $counterAll[0] = NumberCounterAll(0,1,$edu_list);
    $counterEmpty[1] = NumberCounter(0,0,$exp_list);
    $counterAll[1] = NumberCounterAll(0,1,$exp_list);
    $counterEmpty[2] = NumberCounter(0,0,$pro_list);
    $counterAll[2] = NumberCounterAll(0,1,$pro_list);
    $counterEmpty[3] = NumberCounter(0,1,$schoolclub_list);
    $counterAll[3] = NumberCounterAll(0,1,$schoolclub_list);
    $counterEmpty[4] = NumberCounter(0,1,$practice_list);
    $counterAll[4] = NumberCounterAll(0,1,$practice_list);
    $counterEmpty[5] = NumberCounter(0,1,$schoolawards_list);
    $counterAll[5] = NumberCounterAll(0,1,$schoolawards_list);
    $counterEmpty[6] = NumberCounter(0,1,$certificate_list);
    $counterAll[6] = NumberCounterAll(0,1,$certificate_list);
    $counterEmpty[7] = NumberCounter(0,0,$training_list);
    $counterAll[7] = NumberCounterAll(0,1,$training_list);
    $counterEmpty[8] = count(array_filter($otherinfo_list[0]));
    $counterAll[8] = count($otherinfo_list[0]);
    $counterEmpty[9] = count(array_filter($info_list[0]));
    $counterAll[9] = count($info_list[0]);
    $all = array_sum($counterAll);
    $empty = array_sum($counterEmpty);
    $num_sum = array();
    $num_sum[0] = $all;
    $num_sum[1] = $empty;
    return $num_sum;
}

//获取用户技能
function getUsersSkill($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("work_skill")->where(array("uid"=>$uid))->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'createTime'=>$v['createTime'],
                'updateTime'=>$v['updateTime'],
                'resumeId'=>$v['uid'],
                'isDel'=>$v['isDel'],
                'resumeKey'=>'',
                'masterLevel'=>$v['masterLevel'],
                'skillName'=>$v['skillName'],
                'skillPercent'=>$v['skillPercent'],
                'id'=>$v['sid'],
            );
        }
        return $list;
    }

}


//获取用户工作经验
function getUsersWorkExperience($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("work_experience")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                // 'workContent'=>$v['workContent'],
                // 'positionName'=>$v['positionName'],
                // 'resumeId'=>$v['uid'],
                // 'isDel'=>$v['isDel'],
                // 'startDate'=>$v['startDate'],
                // 'endDate'=>$v['endDate'],
                // 'createTime'=>$v['createTime'],
                // 'companyLogo'=>$v['companyLogo'],
                // 'companyName'=>$v['companyName'],
                'id'=>$v['id'],
                'companyName'=>$v['companyName'],
                'positionName'=>$v['positionName'],
                'startDate'=>$v['startDate'],
                'endDate'=>$v['endDate'],
                'isUploadLogo'=>$v['isUploadLogo'],
                'companyLogo'=>$v['companyLogo'],
                'isDel'=>$v['isDel'],
                'createTime'=>$v['createTime'],
                'workContent'=>$v['workContent'],
                'jobContent'=>$v['jobContent'],
                'company_property'=>$v['company_property'],
                'company_size'=>$v['company_size'],
                'company_cat'=>$v['company_cat'],
                'work_cat'=>$v['work_cat'],
                'department'=>$v['department'],
                'work_city'=>$v['work_city'],
                'salary_month'=>$v['salary_month'],
                'reasons'=>$v['reasons'],
                'reterence_name'=>$v['reterence_name'],
                'reterence_relation'=>$v['reterence_relation'],
                'reterence_company'=>$v['reterence_company'],
                'reterence_position'=>$v['reterence_position'],
                'reterence_phone'=>$v['reterence_phone'],
            );
        }
        return $list;
    }

}

//获取用户教育经验
function getUsersEduExperience($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("edu_experience")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'createTime'=>$v['createTime'],
                'education'=>$v['education'],
                'endYear'=>$v['endYear'],
                'startYear'=>$v['startYear'],
                'schoolName'=>$v['schoolName'],
                'professional'=>$v['professional'],
                'resumeId'=>$v['uid'],
                'schoolBadge'=>$v['schoolBadge'],
                'isDel'=>$v['isDel'],
                'reward_punish'=>$v['reward_punish'],
                'whetherGraduate'=>($v['endYear']>date("Y"))?0:1,//是否毕业
                'id'=>$v['id'],
                'course'=>$v['course'],
                'school_city'=>$v['school_city'],
                'school_city_city'=>$v['school_city_city'],
                'degree'=>$v['degree'],
                'academy'=>$v['academy'],
                'major'=>$v['major'],
                'gpa_score'=>$v['gpa_score'],
                'class_ranking'=>$v['class_ranking'],
                'professional_ranking'=>$v['professional_ranking'],
                'professional_describe'=>$v['professional_describe'],
                'tutor_name'=>$v['tutor_name'],
                'tutor_phone'=>$v['tutor_phone'],
            );
        }
        return $list;
    }

}

//获取用户项目经验
function getUsersProExperience($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("pro_experience")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(

                'id'=>$v['id'],
                'positionName'=>$v['positionName'],
                'projectName'=>$v['projectName'],
                'projectRemark'=>$v['projectRemark'],
                'isDel'=>$v['isDel'],
                'createTime'=>$v['createTime'],
                'startDate'=>$v['startDate'],
                'endDate'=>$v['endDate'],
                'dutyRemark'=>$v['dutyRemark'],
                'projectUrl'=>$v['projectUrl'],
                'projectNumber'=>$v['projectNumber'],
                'projectDuty'=>$v['projectDuty'],
                'reterenceName'=>$v['reterenceName'],
                'reterencePhone'=>$v['reterencePhone'],
            );
        }
        return $list;
    }

}
//获取用户学校实践经验
function getSchoolPractice($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("school_practice")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'praCompanyName'=>$v['praCompanyName'],
                'practiceDes'=>$v['practiceDes'],
                'practicePosition'=>$v['practicePosition'],
                'practiceDuty'=>$v['practiceDuty'],
                'schoolName'=>$v['schoolName'],
                'professional'=>$v['professional'],
                'endDate'=>$v['endDate'],
                'startDate'=>$v['startDate'],
                'isDel'=>$v['isDel'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }
}
//获取用户学校社团经验
function getUsersSchoolClub($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("school_club")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'schClubName'=>$v['schClubName'],
                'schClubLevel'=>$v['schClubLevel'],
                'positionName'=>$v['positionName'],
                'workDes'=>$v['workDes'],
                'startDate'=>$v['startDate'],
                'endDate'=>$v['endDate'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }

}
//获取用户学校获奖经验
function getUsersSchoolAwards($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("school_awards")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'awardsName'=>$v['awardsName'],
                'awardsType'=>$v['awardsType'],
                'awardsLevel'=>$v['awardsLevel'],
                'awardsDate'=>$v['awardsDate'],
                'awardsDes'=>$v['awardsDes'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }

}

//获取用户证书
function getUsersCertificate($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("certificate")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'certificateName'=>$v['certificateName'],
                'getDate'=>$v['getDate'],
                'certificateDes'=>$v['certificateDes'],
                'issuing'=>$v['issuing'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }

}

//获取用户证书
function getUsersTrainingExperience($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("training_experience")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'trainingName'=>$v['trainingName'],
                'trainingDes'=>$v['trainingDes'],
                'trainingCompany'=>$v['trainingCompany'],
                'trainingPlace'=>$v['trainingPlace'],
                'startDate'=>$v['startDate'],
                'endDate'=>$v['endDate'],
                'certificateName'=>$v['certificateName'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }

}
//获取用户其他信息
function getUsersotherInfo($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("other_info")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'selfIntro'=>$v['selfIntro'],
                'skill'=>$v['skill'],
                'hobbies'=>$v['hobbies'],
                'achievement'=>$v['achievement'],
                'profile'=>$v['profile'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }

}
function getUserCustomize($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("Gongkai")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'title'=>$v['title'],
                'content'=>$v['content'],
                'id'=>$v['id'],
            );
        }
        return $list;
    }

}

//获取用户作品
function getUsersWorks($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("work_show")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'createTime'=>$v['createTime'],
                'workName'=>$v['workName'],
                'url'=>$v['url'],
                'resumeId'=>$v['uid'],
                'id'=>$v['id'],
                'workNames'=>$v['workNames'],
                'workDescribes'=>$v['workDescribes'],
                'isDel'=>$v['isDel'],
                'imageUrl'=>'',
                'workTitle'=>'',
                'workDescribe'=>'',
                'cutImageUrl'=>'',
            );
        }
        return $list;
    }

}

//获取我的自定义模块
function getUserDefine($uid, $inext = false){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("custom_model")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'createTime'=>$v['createTime'],
                'titleContents'=>$v['titleContents'],
                'updateTime'=>$v['updateTime'],
                'resumeId'=>$v['uid'],
                'id'=>$v['id'],
                'titleContent'=>$v['titleContent'],
                'titleName'=>$v['titleName'],
                'isDel'=>$v['isDel'],
            );
        }
        if($list && !$inext){
            return $list[0];
        }
        return $list;
    }

}

//获取用户开放性问题
function getUsersCustomize($uid){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("Gongkai")->where(array("uid"=>$uid))->order("id desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = array(
                'id'=>$v['id'],
                'title'=>$v['title'],
                'content'=>$v['content'], 
            );
        }
        return $list;
    }

}

//获取我上传的简历
function getMyUploadResume($uid,$num=0){

    $list = array();
    if(!$uid){
        return $list;
    }
    else{
        $arr = M("resume_offline")->where(array("uid"=>$uid))->order("oid desc")->select();
        foreach ($arr as $k=>$v){
            $list[] = $v;
        }
        if($list && $num==1){
            return $list[0];
        }
        return $list;
    }

}

//读取某职位投递人次
function getApplyCount($id){
    return  M("jobs_apply")->where(array("jid"=>$id))->count();
}

//读取我的附件简历数量
function getResumeCount($uid){
    return  M("resume_offline")->where(array("uid"=>$uid))->count();
}

//检查邮箱是否为企业邮箱
function checkIsCompanyEmail($email){
    if(!$email)return '';
    $arr = array(
        '126.com',
        '163.com',
        'sina.com',
        '21cn.com',
        'sohu.com',
        'yeah.net',
        'yahoo.com.cn',
        'tom.com',
        'qq.com',
        'etang.com',
        'eyou.com',
        '56.com',
        'x.cn',
        'chinaren.com',
        'sogou.com',
        'citiz.com',
        '139.com',
        'aliyun.com',
        '2980.com',
        'foxmail.com',
        '263.net',
        'wo.cn',
        '139.com',
        '189.cn',
        '188.com',
        'renren.com',
        '173.com',
        '17173.com',
        '11185.cn',
        'hexun.com',
        'tianya.cn',
        'sunmail.cn',
        '128.com',
        'cntv.cn',
        'vip.163.com',
        'vip.126.com',
        'hotmail.com',
        'outlook.com',
        'msn.com',
        'yahoo.com',
        'gmail.com',
        'aim.com',
        'aol.com',
        'mail.com',
        'walla.com',
        'inbox.com',
        'icloud.com',
        'gmx.com',
        'hushmail.com',
        'shortmail.com',
        'fastmail.com',
        'protonmail.com',
        'korea.com',
        'ok.net',
        'mail.2world.com',
        'nextmail.ru',
        'zoho.com',
        'postmaster.com',
        'goo.ne.jp',
        'v.gg',
        'leemail.me',
    );
    $extemail = explode("@", $email);
    if($extemail[0] && $extemail[1]){
        if( !in_array( strtolower($extemail[1]), $arr ) ){
            return true;
        }
    }
    return false;
}


//检查邮箱是否为企业邮箱
function getEmailDomain($email){
    if(!$email)return '';

    $email_domain = explode("@", $email);
    if( in_array($email_domain[1], array("qq.com"))){
        $email_link = 'http://mail.'.$email_domain[1];
    }
    else $email_link = 'http://'.$email_domain[1];

    return $email_link;
}


//检查公司名称是否存在
function checkCompanyName($name,$uid=0){
    if(!$name) return array();
    $map = array('company_name'=>$name );
    if($uid){
        $map['cuid'] = array('neq',$uid) ;
    }
    $check = M("company")->where($map )->find();
    return $check;
}

//检查是否有统一企业邮箱注册过
function checkTheSameCompanyReg($email,$myuid=0){
    if(!$email)return '';
    $uid_str = '';
    if($myuid){
        $uid_str = " and c.cuid!='".$myuid."' ";
    }
    $email_domain = explode("@", $email);
    $email_exp = "@".$email_domain[1];

    //$row = M("ucenter_member")->where(array("email"=>array("like",$email_exp)))->find();
    $row = getUsersInfo("m.type=1 and c.company_name !='' $uid_str and um.email like '%".$email_exp."%' ");//"um.id='".$row['id']."'"
    if(!$row){
        return 0;
    }
    else{
        return $row;
    }


}


//获取swf地址
function getFlashUrl($page_url){
    if(!$page_url)return '';
    $url = $page_url;
    $page_content = file_get_contents($page_url);

    if (strpos($page_url, "youku.com")){
        //<input type="text" class="form_input form_input_s" id="link2" value="http://player.youku.com/player.php/Type/Folder/Fid/22304470/Ob/1/sid/XNzIwMjA0MTM2/v.swf" >
        preg_match_all('/\<input type="text" class="form_input form_input_s" id="link2" value="(.*?)" \>/',$page_content,$result);

        $swfurl=$result[1][0];
        if(!empty($swfurl)){
            return $swfurl;
        }
    }
    else if(strpos($page_url, "v.qq.com")){
        if(preg_match("/\/play\//", $url)){
            $html = $page_content;
            preg_match("/url=[^\"]+/", $html, $matches);
            if(!$matches); return false;
            $url = $matches[0];
        }
        preg_match("/vid=([^\_]+)/", $url, $matches);
        $vid = $matches[1];
        $html = $page_content;
        // query
        preg_match("/flashvars\s=\s\"([^;]+)/s", $html, $matches);
        $query = $matches[1];
        if(!$vid){
            preg_match("/vid\s?=\s?vid\s?\|\|\s?\"(\w+)\";/i", $html, $matches);
            $vid = $matches[1];
        }
        $query = str_replace('"+vid+"', $vid, $query);
        parse_str($query, $output);
        $data['img'] = "http://vpic.video.qq.com/{$$output['cid']}/{$vid}_1.jpg";
        $data['url'] = $url;
        $data['title'] = $output['title'];
        $data['swf'] = "http://imgcache.qq.com/tencentvideo_v1/player/TencentPlayer.swf?".$query;
        return $data['swf'];
    }
    else if(strpos($page_url, "tudou.com")){

        preg_match("#view/([-\w]+)/#", $page_url, $matches);

        if (empty($matches)) {
            if (strpos($url, "/playlist/") == false) return false;

            if(strpos($url, 'iid=') !== false){
                $quarr = explode("iid=", $lowerurl);
                if (empty($quarr[1]))  return false;
            }elseif(preg_match("#p\/l(\d+).#", $lowerurl, $quarr)){
                if (empty($quarr[1])) return false;
            }

            $html = $page_content;
            $html = iconv("GB2312", "UTF-8", $html);

            preg_match("/lid_code\s=\slcode\s=\s[\'\"]([^\'\"]+)/s", $html, $matches);
            $icode = $matches[1];

            preg_match("/iid\s=\s.*?\|\|\s(\d+)/sx", $html, $matches);
            $iid = $matches[1];

            preg_match("/listData\s=\s(\[\{.*\}\])/sx", $html, $matches);

            $find = array("/\n/", '/\s/', "/:[^\d\"]\w+[^\,]*,/i", "/(\{|,)(\w+):/");
            $replace = array("", "", ':"",', '\\1"\\2":');
            $str = preg_replace($find, $replace, $matches[1]);
            //var_dump($str);
            $json = json_decode($str);
            //var_dump($json);exit;
            if(is_array($json) || is_object($json) && !empty($json)){
                foreach ($json as $val) {
                    if ($val->iid == $iid) {
                        break;
                    }
                }
            }

            $data['img'] = $val->pic;
            $data['title'] = $val->title;
            $data['url'] = $url;
            $data['swf'] = "http://www.tudou.com/l/{$icode}/&iid={$iid}/v.swf";

            return $data['swf'];
        }

        $host = "www.tudou.com";
        $path = "/v/{$matches[1]}/v.swf";

        $ret = _fsget($path, $host);

        if (preg_match("#\nLocation: (.*)\n#", $ret, $mat)) {
            parse_str(parse_url(urldecode($mat[1]), PHP_URL_QUERY));

            $data['img'] = $snap_pic;
            $data['title'] = $title;
            $data['url'] = $url;
            $data['swf'] = "http://www.tudou.com/v/{$matches[1]}/v.swf";

            return $data['swf'];
        }
        return 'ok';

    }
    else if (strpos($page_url, "163.com")){
        //src : 'http://swf.ws.126.net/openplayer/v01/-0-2_M7SOVKE06_M7SOVQVMI-vimg1_ws_126_net//image/snapshot_movie/2013/11/5/C/M9DP4N35C-.swf',
        preg_match_all("/src : '(.*?)',/",$page_content,$result);
        //print_r($result);exit;
        $swfurl=$result[1][1];
        if(!empty($swfurl)){
            return $swfurl;
        }
    }
    else return '';
    exit;

}


function _fsget($path='/', $host='', $user_agent=''){
    if(!$path || !$host) return false;
    $user_agent = $user_agent ? $user_agent : self::USER_AGENT;

    $out = <<<HEADER
GET $path HTTP/1.1
Host: $host
User-Agent: $user_agent
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-cn,zh;q=0.5
Accept-Charset: GB2312,utf-8;q=0.7,*;q=0.7\r\n\r\n
HEADER;
    $fp = @fsockopen($host, 80, $errno, $errstr, 10);
    if (!$fp)  return false;
    if(!fputs($fp, $out)) return false;
    while ( !feof($fp) ) {
        $html .= fgets($fp, 1024);
    }
    fclose($fp);
    // 判断是否gzip压缩
    if($dehtml = self::_gzdecode($html))
        return $dehtml;
    else
        return $html;
}

//检查企业资料是否完成    需要更新状态
function checkCompanyStatus($uid){
    if(!$uid) return 0;
    $info = M("Member")->where(array('uid'=>$uid))->find();
    if($info['type']==1 && $info['com_id']){//&& $info['status']<100
        $company = M("Company")->where(array('com_id'=>$info['com_id']))->find();
        if($company && $company['company_name'] && $company['logo'] && $company['company_city'] 
            && $company['hangye'] && $company['guimu'] && $company['gongsi_xingzhi'] 
            && $company['company_short_name'] && $company['hangye']  ){

            M("Member")->where(array('com_id'=>$info['com_id'],"status"=>2))->save(array('status'=>100));
            M("Company")->where(array('com_id'=>$info['com_id']))->save(array('company_status'=>100));
            
            if( $uid==getUsersSession('uid') && $info['status']=2 ){
                inputUsersSession('status',100);
            }

        }

    }
    return true;
}


/**
 * 显示默认头像   logo之类的
 * $image 图像地址
 * @param number $type:1公司logo 2用户头像 0普通图片
 */
function showImage($image,$type=1){
    if($image){
        echo $image;
    }
    else{
        if($type==1){
            echo '/Public/Home/images/default_headpic.png';
        }
        else if($type==2){
            echo '/Public/Home/images/logo_default.png';
        }
    }
}

//输出最近执行的sql语句
function getLastSql(){
    echo M()->getLastSql();
    exit;
}

//公司详情访问+1
function updateCompanyHits($uid){
	if(!$uid) {
		return false;
	}
	M("Member")->where( array("uid"=>$uid) )->setInc('hits',1);
	return true;
}

//检查某字段是否存在
function checkRecord($table,$where=array() ){
	if(!$table) return '';
	$mode = M("$table");
	$bool   =  $mode->where($where)->find();
	if($bool) {
		return $bool;
	}
	else return false;
}


/* 列表左侧筛选，小伟 */

function geturl($catnmae,$myurl){
    $myurls = $_GET[$myurl];
    if($myurl=="gs"){
        $gongsi_xingzhi = C("GONGSI_XINGZHI");
        $myurls = $gongsi_xingzhi[$myurls];
    }
    else if($myurl=="zw"){
        $hangye_lingyu = require DATA_PATH.'webCategoryAll.php';
        $myurls = $hangye_lingyu[$myurls]['title'];
    }
	else if($myurl=="bigid"){
        $hangye_lingyu = require DATA_PATH.'webCategoryAll.php';
        $myurls = $hangye_lingyu[$myurls]['title'];
    }
	else if($myurl=="hy"){
        $hangye_lingyu = require DATA_PATH.'webCategoryAll.php';
        $myurls = $hangye_lingyu[$myurls]['title'];
    }
    if(!empty($myurls)){
        echo "<div class='selected'><strong>$catnmae</strong><span>$myurls</span><em class='select_remove'></em></div>";
   }
}

function showsty($myurl,$myshow){
    $myurls = $_GET[$myurl];
    if(!empty($myurls)){
    if($myshow=='show1'){
        echo 'slideUp';
    }elseif($myshow=='show2'){
		 echo 'transform';
    }else{
        echo 'dn';
}
}
}

function showsm($myurl){
$myurls = $_GET[$myurl];
if(!empty($myurls)){
	 echo 'transform';
}
}

function showsx($myurl,$mynm){
$myurls = $_GET[$myurl];
if($myurls==$mynm){
    echo 'cur';
}
}


//读取某公司职位数量
function getCompanyJobsNum($com_id=0){
    $ids  = array();
    $count = M("jobs")->where(array("com_id"=>$com_id))->count();
    return $count;
}

//读取某用户发布职位ids
function getUserJobsIds($uid,$return=0){
    $ids  = array();
    $list = M("jobs")->where(array("uid"=>$uid))->field("jid")->select();
    foreach ($list as $k=>$v){
        $ids[] = $v['jid'];
    }
    if($return==1){
        return implode(",", $ids);
    }
    else return $ids;
}

//读取某用户简历管理数量
function getJobsApplyNum($ids='',$map=array()){
    if(!$ids)return 0;
    $maps = $map;
    $maps['jid'] = array("in",$ids);
    $count = M("jobs_apply")->where($maps)->count();
    return intval($count);
}

//读取我的简历数量
function getJobsApplyNumByCon($uid,$map){
    $ids = getUserJobsIds($uid,1);
    return getJobsApplyNum($ids,$map);

}


//读取最近学历记录
function getUserLastEdu($uid){
    return  M("edu_experience")->where(array("uid"=>$uid))->order("endYear desc")->find();
}

//读取最近工作
function getUserLastWork($uid){
    return  M("work_experience")->where(array("uid"=>$uid))->order("endDate desc")->find();
}

//读取已转发的邮箱
function getForwardRecord($aid){
    $list = M("jobs_apply_forward")->where(array('aid'=>$aid))->select();
    return $list;
}

//用户注册完后    默认添加通知模板
function addDefaultTpl($uid,$type=1){
    if($type==1){
        $type = "INTERVIEW_TEMPLATE";
        $title ="默认模版";
        $content = "请准时参加面试";
    }
    else {
        $type = "REFUSE_TEMPLATE";
        $title ="系统模版";
        $content = "非常荣幸收到您的简历，在我们仔细阅读您的简历之后，却不得不很遗憾的通知您：\n\n您的简历与该职位的定位有些不匹配，因此无法进入面试。 \n\n但您的信息已录入我司人才储备库，当有合适您的职位开放时我们将第一时间联系您，希望在未来我们有机会成为一起拼搏的同事；\n\n再次感谢您对我们的信任，祝您早日找到满意的工作。";
    }

    $template = array(
        "type"=>$type,
        "isdefault"=>1,
        "title"=>$title,
        "content"=>$content,
        "uid"=>$uid,
        "addtime"=>time(),
        "link_address"=>'',
        "link_name"=>'',
        "link_phone"=>'',
    );

    M("notice_tpl")->add($template);

}



//是否认证
function getUsersVip($id){
    $array = array(
        '0'=>"未认证",
        '1'=>"审核中",
        '2'=>"认证成功",
        '-1'=>"认证失败"
    );
    if(isset($id)){
        return $array[$id];
    }

}

//配置地区
function getChinaArea($id){
    $array = array(
        '1'=>"华北及东北地区",
        '2'=>"华东地区",
        '3'=>"华南及中南地区",
        '4'=>"西南及西北地区"
    );
    if($id=="all"){
        return $array;
    }
    return $array[$id];

}

//星期
function getWeekName($date='',$isdate=1){
    if(!$date){
        if($isdate){
            $date = date("Y-m-d");
        }
        else $date = time();
    }
    if($isdate){
        $date = strtotime($date);
    }

    $week = date("w",$date);
    $arr = array("日","一","二","三","四","五","六");
    return $arr[$week];
}


//获取面试时间
function getInterViewDate($date){
    if(!$date)return '';
    $date2 = strtotime($date);

    return date("m月d日",$date2)."  ".date("H:i",$date2)." （周".getWeekName($date)."）";
}

//获取我收藏的ids
function getMyCollectionsIds($uid,$type=1){//1job2company3video
    if(!$uid){
        return array();
    }
    $list = M("collection")->where(array("uid"=>$uid,"type"=>$type))->select();
    $ids = array();
    foreach ($list as $k=>$v){
        $ids[] = $v['toid'];
    }
    return $ids;
}

function geturl2($catnmae,$myval,$myurl){
    $myurls = $myval;
    if($myurl=="gs"){
        $gongsi_xingzhi = C("GONGSI_XINGZHI");
        $myurls = $gongsi_xingzhi[$myurls];
    }
    else if($myurl=="zw"){
        $hangye_lingyu = require DATA_PATH.'webCategoryAll.php';
        $myurls = $hangye_lingyu[$myurls]['title'];
    }
    else if($myurl=="bigid"){
        $hangye_lingyu = require DATA_PATH.'webCategoryAll.php';
        if($hangye_lingyu[$myurls]['pid']==0){
            $myurls = $hangye_lingyu[$myurls]['title'];
        }
    }
    else if($myurl=="hy"){
        $hangye_lingyu = require DATA_PATH.'webCategoryAll.php';
        if($hangye_lingyu[$myurls]['pid']>0){
            $myurls = $hangye_lingyu[$myurls]['title'];
        }
    }
    if(!empty($myurls)){
        echo "<div class='selected'><strong>$catnmae</strong><span>$myurls</span><em class='select_remove'></em></div>";
    }
}


//配置简历投递状态
//0待处理/投递成功、待沟通(查看联系方式)-1不适合-2自动过滤1安排面试
function getResumeStatus($status,$isread=0,$view_contact=0){
    if($status==-2){
        return '投递成功';
        //return '自动过滤';
    }
    else if($status==-1){
        return '不适合';
    }
    else if($status==1){
        return '安排面试';
    }
    else if($status==0){
        if($view_contact){
            return '待沟通';
        }
        if($isread){
            return '简历被查看';
        }
        return '投递成功';
    }
    else return '';


}


//添加日志
function addApplyLog($aid,$uid,$type,$from_uid=0,$name,$ext_data=array()){
	if(!$aid || !$uid || !$type ){
		return false;
	}
	$content = '';
	//SOHU&nbsp;给你发来面试通知
	//你的简历已经通过筛选，三个工作日内企业将与您沟通
	//youshan&nbsp;已查看你的简历
	//youshan&nbsp;已成功接收你的简历
	switch ($type){
		case 1:
			$content = $name."&nbsp;已成功接收你的简历";
			break;
		case 2:
			$content = $name."&nbsp;已查看你的简历";
			break;
		case 3:
			$content = "你的简历已经通过筛选，三个工作日内企业将与您沟通";
			break;
		case 4:
			$content = $name."&nbsp;给你发来面试通知";
			break;
		case 10:
		    $content = $name."&nbsp;简历被标记为不合适";
		    break;
	}
	if(!$content){
	    return false;
	}
	$data = array(
		'aid'=>$aid,
		'uid'=>$uid,
		'opt_time'=>time(),
		'from_uid'=>$from_uid,
		'type'=>$type,
		'content'=>$content,
		'ext_data'=>$ext_data?serialize($ext_data):'',
	);
	M("jobs_apply_log")->add($data);

}

//根据日志组合
function getApplyLog($aid,$list=array()){
	if(!$aid ){
		return false;
	}

	$html = '';
	if(!$list){
	    $list = M("jobs_apply_log")->where(array('aid'=>$aid))->order("lid desc")->select();
	}

	$first_log = $list[0];
	foreach ($list as $k=>$v){
		$top = $memo = $content = '';
		if($k==0){
			$top = 'class="top"';
		}

		if($v['type']==4){
			$item = unserialize($v['ext_data']);
			$memo = '<font>面试时间：</font>'.$item['time'].'<br />
			<font>联系人：</font>'.$item['name'].'<br />
			<font>联系电话：</font>'.$item['phone'].'<br />
			<font>面试地点：</font>'.$item['address'].'<br />
			<font>补充内容：</font>'.$item['memo'].'';
		}
		if($v['type']==10){
		    $item = unserialize($v['ext_data']);
		    $memo = $item['content'];
		}
		$html .= '<li '.$top.'>
			<div class="list_time">
			<em></em>'.showDay($v['opt_time']).'
			</div>
			<div class="list_body">
			<h3 class="contact_title">'.$v['content'].'</h3>
			'.$memo.'
			</div>
			</li>
			';
	}

	$type = $first_log['type'];

	return array('content'=>$html,"step"=>$type);
}

//读取广告图
function getAdvPic($cid,$num=1){
    if(!$cid) {
        return array();
    }
    $list = M("adv")->where( array("cid"=>$cid) )->order("sn asc")->limit(0,$num)->select();
    return $list;
}

//test
function print_test($arr,$exit=1){
    echo '<pre>';
    print_r($arr);
    if($exit){
        exit;
    }

}


// 判断是否是在微信浏览器里
function isWeixinBrowser() {
    $agent = $_SERVER ['HTTP_USER_AGENT'];
    if (! strpos ( $agent, "icroMessenger" )) {
        return false;
    }
    return true;
}


//微信菜单类型
function getWxMenuType($key="all"){

	$array = array(
		'1'=>"一级菜单",
		'2'=>"点击链接",
		'3'=>"发送关键词",
	);
	if($key=="all"){
		return $array;
	}
	else {
		return $array[$key];
	}

}



//添加自定义菜单
function addFollow($user,$token='',$status=1){
    
    $data = array(
        'token'=>$token,
        'openid'=>$user['openid'],
        'nickname'=>$user['nickname'],
        'sex'=>$user['sex'],
        'city'=>$user['city'],
        'province'=>$user['province'],
        'country'=>$user['country'],
        'language'=>$user['language'],
        'headimgurl'=>$user['headimgurl'],
        'subscribe_time'=>date("Y-m-d H:i:s",$user['subscribe_time']),
        'addtime'=>date("Y-m-d H:i:s"),
        'unionid'=>$user['unionid'],
        'status'=>$status,
    );
    
    M("wx_follow")->add($data,'',1);
    
}


//添加微信日志
function addWxLog($yid,$post='',$reply='',$ext=array()){
    if(!$ext){
        $ext = $post;
    }
    $data = array(
        'yid'=>$yid,
        'post'=>is_array($post)?serialize($post):$post,
        'reply'=>is_array($reply)?serialize($reply):$reply,
        'type'=>$ext['MsgType'],
        'event'=>$ext['Event'],
        'openid'=>$ext['FromUserName'],
        'keyword'=>$ext['Content'],
        'add_time'=>date("Y-m-d H:i:s"),
    );
    M("wx_log")->add($data);

}


//查找是否绑定过
function checkUserWxBind($openid){
    if(!$openid) {
        return false;
    }
    $row = M("member")->where( array("bind_openid"=>$openid) )->find();
    return $row;
}

//根据id发送模板消息
function sendTplMsgById($hash,$tid,$uid,$data,$url=''){
    if(!$hash || !$tid || !$uid || !$data){
        return false;
    }
    $data = array(
        'uid'=>$uid,
        'tid'=>$tid,
        'url'=>$url,
        'data'=>serialize(
            $data
        ),
    );

    $res = curlPost(WEB_URL."Wx/sendTplMsg/hash/".$hash, $data,0,0);
    return $res;
}


//写入文件
function fileTest($content,$path="",$is_add=1){
    if(is_array($content)){
        $content = serialize($content);
        
    }
    if(!$path){
        $path=WEB_PATH."/Run/Data/test.txt";
    }
    if($is_add){
        return @file_put_contents($path, $content,FILE_APPEND);
    }
    return @file_put_contents($path, $content);
}
