
#删除用户
DROP USER 'vue-ts-admin'@'localhost';
DROP USER 'vue-ts-admin'@'%';


#创建数据库
create database adminDemo;

#创建用户
create user 'vue-ts-admin'@'localhost' identified by '123456';
create user 'vue-ts-admin'@'%' identified by '123456';


#赋予用户数据库权限
grant all on adminDemo.* TO 'vue-ts-admin'@'%';

create table permission(
    id int primary key not null auto_increment,												#id
    url varchar(100) not null,                                                              #路由的url
    remarks varchar(200) not null,                                                          #备注
    type boolean not null default 0,                                                        #类型,0表示路径1,表示按钮权限
    parentId int not null default 0                                                         #父级id
);
create table permission_group(
    id int primary key not null auto_increment,												#id
    mark varchar(100) not null,                                                             #标识
    permission varchar(200) not null,                                                       #权限的id(1-2-3)
    remarks varchar(200)                                                                    #备注
);

create table permission_user(
	id int primary key not null auto_increment,												#id
    username varchar(20) not null,															#用户名
    password varchar(100) not null,															#密码
    nickname varchar(20) not null default '默认的管理员',									#昵称
    permission_groupId int not null,
    key `permission_groupId` (`permission_groupId`),
    constraint `bind-permission-id` foreign key (`permission_groupId`) references `permission_group` (`id`) on delete cascade on update cascade
);

insert into permission_group(mark,permission) values('admin', '*');
insert into permission_user(username, password, permission_groupId) values('admin' ,'123456', 1);
