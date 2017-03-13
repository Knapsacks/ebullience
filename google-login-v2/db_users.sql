

CREATE TABLE IF NOT EXISTS `tbl_users` (
       `fld_user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `fld_google_id` varchar(100) NOT NULL,
        `fld_user_name` varchar(60) NOT NULL,
        `fld_user_email` varchar(60) DEFAULT NULL,
        `fld_user_doj` int(10) NOT NULL,
        PRIMARY KEY (`fld_user_id`) 
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;