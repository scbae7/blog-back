-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: board
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_number` int NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
  `title` text NOT NULL COMMENT '게시물 제목',
  `content` text NOT NULL COMMENT '게시물 내용',
  `write_datetime` datetime NOT NULL COMMENT '게시물 작성 날짜 및 시간',
  `favorite_count` int NOT NULL DEFAULT '0' COMMENT '게시물 좋아요 수',
  `comment_count` int NOT NULL DEFAULT '0' COMMENT '게시물 댓글 수',
  `view_count` int NOT NULL DEFAULT '0' COMMENT '게시물 조회 수',
  `writer_email` varchar(50) NOT NULL COMMENT '게시물 작성자 이름',
  PRIMARY KEY (`board_number`),
  KEY `FK_user_TO_board` (`writer_email`),
  CONSTRAINT `FK_user_TO_board` FOREIGN KEY (`writer_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='게시물 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (13,'수정','수정 내용','2024-11-26 03:51:05',0,0,7,'email15@email.com'),(14,'오늘 점심 뭐d3','먹을까','2024-11-26 03:51:05',0,0,2,'email15@email.com'),(15,'수정 게시물입니다.','수정한 내용입니다.','2024-11-26 03:51:05',1,1,19,'email15@email.com'),(18,'Test Title','Test Content','2024-11-28 00:03:16',1,28,33,'test@example.com'),(19,'수정','먹을까','2024-12-09 18:05:33',0,0,2,'email15@email.com'),(20,'게시물1','게시물1','2024-12-14 17:02:13',1,0,1,'email15@email.com'),(22,'1216게시물','1216게시물입니다.','2024-12-16 16:20:47',0,0,6,'email15@email.com'),(23,'1223게시물 제목입니다.','1223게시물 내용입니다.','2024-12-23 15:50:47',0,0,2,'email15@email.com'),(24,'23일 제목입니다.','23일 내용입니다.','2024-12-23 16:31:31',0,0,2,'email1223@email.com'),(25,'3월14일입니다.','3월14일입니다.','2025-03-14 16:04:08',0,0,0,'email15@email.com'),(26,'2번째 게시물','2번째 게시물','2025-03-14 16:09:50',0,0,0,'email15@email.com'),(27,'3번째 게시물','3번째 게시물','2025-03-14 16:10:00',0,0,0,'email15@email.com'),(28,'4번째 게시물','4번째 게시물','2025-03-14 16:13:14',0,0,0,'email15@email.com'),(30,'6번째 게시물','6번째 게시물','2025-03-14 16:13:53',0,0,0,'email15@email.com'),(31,'7번째 게시물','7번째 게시물','2025-03-14 16:14:51',0,0,0,'email15@email.com');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `board_list_view`
--

DROP TABLE IF EXISTS `board_list_view`;
/*!50001 DROP VIEW IF EXISTS `board_list_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `board_list_view` AS SELECT 
 1 AS `board_number`,
 1 AS `title`,
 1 AS `content`,
 1 AS `title_image`,
 1 AS `favorite_count`,
 1 AS `comment_count`,
 1 AS `view_count`,
 1 AS `write_datetime`,
 1 AS `writer_email`,
 1 AS `writer_nickname`,
 1 AS `writer_profile_image`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_number` int NOT NULL AUTO_INCREMENT COMMENT '댓글 번호',
  `content` text NOT NULL COMMENT '댓글 내용',
  `write_datetime` datetime NOT NULL COMMENT '작성 날짜 및 시간',
  `user_email` varchar(50) NOT NULL COMMENT '사용자 이메일',
  `board_number` int NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (`comment_number`),
  KEY `FK_user_TO_comment` (`user_email`),
  KEY `FK_board_TO_comment` (`board_number`),
  CONSTRAINT `FK_board_TO_comment` FOREIGN KEY (`board_number`) REFERENCES `board` (`board_number`),
  CONSTRAINT `FK_user_TO_comment` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='댓글 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (15,'하이요','2024-12-04 17:34:32','email15@email.com',18),(16,'댓글1','2024-12-09 16:53:08','email15@email.com',18),(17,'댓글2','2024-12-09 16:53:12','email15@email.com',18),(18,'댓글3','2024-12-09 16:53:16','email15@email.com',18),(19,'댓글4','2024-12-09 16:53:34','email15@email.com',18),(20,'댓글5','2024-12-09 16:53:38','email15@email.com',18),(21,'댓글6','2024-12-09 16:53:43','email15@email.com',18),(22,'댓글7','2024-12-09 16:53:47','email15@email.com',18),(23,'댓글8','2024-12-09 16:54:02','email15@email.com',18),(24,'댓글10','2024-12-09 16:54:08','email15@email.com',18),(25,'댓르11','2024-12-09 16:56:02','email15@email.com',18),(26,'댓글12','2024-12-09 16:56:06','email15@email.com',18),(27,'댓글13','2024-12-09 16:56:10','email15@email.com',18),(28,'댓르14','2024-12-09 16:56:15','email15@email.com',18),(29,'댓글15','2024-12-09 16:56:56','email15@email.com',18),(30,'댓글16','2024-12-09 16:57:01','email15@email.com',18),(31,'댓글17','2024-12-09 16:59:25','email15@email.com',18),(32,'댓글18','2024-12-09 16:59:30','email15@email.com',18),(33,'댓글19','2024-12-09 16:59:38','email15@email.com',18),(34,'댓글20\n','2024-12-09 17:03:39','email15@email.com',18),(35,'댓글21','2024-12-09 17:03:43','email15@email.com',18),(36,'댓글22','2024-12-09 17:03:47','email15@email.com',18),(37,'댓글33','2024-12-09 17:04:05','email15@email.com',18),(38,'댓글25\n','2024-12-09 17:04:09','email15@email.com',18),(39,'댓글25','2024-12-09 17:04:16','email15@email.com',18),(40,'댓글26','2024-12-09 17:15:51','email15@email.com',18),(41,'댓글27','2024-12-09 17:15:55','email15@email.com',18),(42,'댓글28','2024-12-09 17:16:01','email15@email.com',18),(43,'안녕하세요','2024-12-09 17:48:02','email15@email.com',15);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `user_email` varchar(50) NOT NULL COMMENT '사용자 이메일',
  `board_number` int NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (`user_email`,`board_number`),
  CONSTRAINT `FK_user_TO_favorite` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='좋아요 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES ('email15@email.com',15),('email15@email.com',18),('email15@email.com',20);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image` text NOT NULL COMMENT '게시물 이미지 URL',
  `sequence` int NOT NULL AUTO_INCREMENT COMMENT '이미지 번호',
  `board_number` int NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (`sequence`),
  KEY `FK_board_TO_image` (`board_number`),
  CONSTRAINT `FK_board_TO_image` FOREIGN KEY (`board_number`) REFERENCES `board` (`board_number`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='게시물 이미지 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES ('http://localhost:4100/file/b1e7f3c3-2566-4c64-9170-c361cb94ed4a.png',15,13),('http://localhost:4100/file/9583f051-2edd-4ac6-90f2-074d264a805f.png',16,19),('http://localhost:4100/file/d7fa671f-bee5-43ef-858a-6334bf1f5101.png',17,19),('http://localhost:4100/file/bd121a98-8977-417b-92e1-409558219267.png',18,15),('http://localhost:4100/file/83892140-5fd6-4611-94cb-d9ae1fc0d26d.png',19,20),('http://localhost:4100/file/092e9464-af31-4b7b-ab3f-e60cc0ad2fec.png',22,22),('http://localhost:4100/file/73d9dd59-4d32-4f02-a8f2-a9710f14325e.jpeg',23,23),('http://localhost:4100/file/837db192-440f-4125-879e-6a27ae42cc14.jpeg',24,27),('http://localhost:4100/file/5162180c-a500-41f9-af81-8bdb16350667.jpeg',25,28),('http://localhost:4100/file/4160538f-911b-4d56-8f7a-54d90b13c719.jpeg',27,30),('http://localhost:4100/file/d2bb3f16-f012-47ba-9f29-abcd4c3ec611.png',28,31);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_log`
--

DROP TABLE IF EXISTS `search_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_log` (
  `sequence` int NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `search_word` text NOT NULL COMMENT '검색어',
  `relation_word` text COMMENT '관련 검색어',
  `relation` tinyint(1) NOT NULL COMMENT '관련 검색어 여부',
  PRIMARY KEY (`sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='검색 기록 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_log`
--

LOCK TABLES `search_log` WRITE;
/*!40000 ALTER TABLE `search_log` DISABLE KEYS */;
INSERT INTO `search_log` VALUES (37,'바이',NULL,0),(38,'바이',NULL,0),(39,'게시물',NULL,0),(40,'게시물',NULL,0),(41,'오늘',NULL,0),(42,'오늘',NULL,0),(43,'수정',NULL,0),(44,'수정',NULL,0),(45,'qkdl',NULL,0),(46,'qkdl',NULL,0),(47,'게시물',NULL,0),(48,'게시물',NULL,0),(49,'오늘',NULL,0),(50,'오늘',NULL,0),(51,'게시물',NULL,0),(52,'게시물',NULL,0),(53,'오늘',NULL,0),(54,'오늘',NULL,0),(55,'게시물','오늘',0),(56,'오늘','게시물',1),(57,'게시물',NULL,0),(58,'게시물',NULL,0),(59,'하이','게시물',0),(60,'게시물','하이',1),(61,'바이','하이',0),(62,'하이','바이',1),(63,'오늘','바이',0),(64,'바이','오늘',1),(65,'게시물','오늘',0),(66,'오늘','게시물',1),(67,'오늘','게시물',0),(68,'게시물','오늘',1),(69,'게시물','오늘',0),(70,'오늘','게시물',1),(71,'수정',NULL,0),(72,'수정',NULL,0),(73,'게시물',NULL,0),(74,'게시물',NULL,0),(75,'게시물',NULL,0),(76,'게시물',NULL,0),(77,'오늘',NULL,0),(78,'오늘',NULL,0),(79,'바이','오늘',0),(80,'오늘','바이',1),(81,'오늘','바이',0),(82,'바이','오늘',1),(83,'게시물','오늘',0),(84,'오늘','게시물',1),(85,'오늘','게시물',0),(86,'게시물','오늘',1),(87,'게시물','오늘',0),(88,'오늘','게시물',1),(89,'하이','게시물',0),(90,'게시물','하이',1),(91,'게시물','하이',0),(92,'하이','게시물',1),(93,'오늘','게시물',0),(94,'게시물','오늘',1),(95,'게시물','오늘',0),(96,'오늘','게시물',1),(97,'오늘','게시물',0),(98,'게시물','오늘',1),(99,'게시물','오늘',0),(100,'오늘','게시물',1),(101,'하이','게시물',0),(102,'게시물','하이',1),(103,'게시물','하이',0),(104,'하이','게시물',1),(105,'오늘','게시물',0),(106,'게시물','오늘',1),(107,'게시물','오늘',0),(108,'오늘','게시물',1),(109,'하이','게시물',0),(110,'게시물','하이',1),(111,'바이','하이',0),(112,'하이','바이',1),(113,'오늘','바이',0),(114,'바이','오늘',1),(115,'게시물','오늘',0),(116,'오늘','게시물',1),(117,'오늘','게시물',0),(118,'게시물','오늘',1),(119,'바이','오늘',0),(120,'오늘','바이',1),(121,'하이','바이',0),(122,'바이','하이',1),(123,'바이',NULL,0),(124,'바이',NULL,0),(125,'오늘',NULL,0),(126,'오늘',NULL,0),(127,'제목',NULL,0),(128,'제목',NULL,0),(129,'게시물',NULL,0),(130,'게시물',NULL,0);
/*!40000 ALTER TABLE `search_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(50) NOT NULL COMMENT '사용자 이메일',
  `password` varchar(100) NOT NULL COMMENT '사용자 비밀번호',
  `nickname` varchar(20) DEFAULT NULL COMMENT '사용자 닉네임',
  `tel_number` varchar(15) NOT NULL COMMENT '사용자 휴대전화번',
  `address` text NOT NULL COMMENT '사용자 주소',
  `address_detail` text COMMENT '사용자 상세 주소',
  `profile_image` text COMMENT '사용자 프로필 사',
  `agreed_personal` tinyint(1) NOT NULL COMMENT '개인정보 동의 여부',
  PRIMARY KEY (`email`),
  UNIQUE KEY `tel_number` (`tel_number`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='사용자 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('email11@email.com','$2b$10$7o8.7WKHdahkWDGFAbuB1eBPH3Lk6LdB/xde.pfgcoJ9HJ/WbebGi','nickname11','01098765555','안산시 단원구','롯데백화점',NULL,1),('email12@email.com','$2b$10$2/flM8X4WiY4MUL/PAvbh.b21WU.N6bTtduULppKTJnoxOdPlkyBe','nickname12','01098765556','안산시 단원구','롯데백화점',NULL,1),('email1223@email.com','$2b$10$xg0DF757ZYBMTiOtd/cdEeMoe9NHurGn/HGaPgDvKyIRXbdhbg4tW','nickname1223','01012344321','경기 안산시 단원구 갈마지길 5-2','아파트',NULL,1),('email13@email.com','$2b$10$b6uJ0hb4xLLFp1T2t7IByO9Z07iPC4d65VyPlHTrl.eswCyA.3ucq','nickname13','01098765557','안산시 단원구','롯데백화점',NULL,1),('email14@email.com','$2b$10$Un4XBq7pzuwxB4sVMcH6EeCVfkH4iu3z7E5/n3ZRgpBa8/yGs33Fa','nickname14','01098765558','안산시 단원구','롯데백화점',NULL,1),('email15@email.com','$2b$10$rd9/wggC1q6wPMo6030h3O.SKFFfXNuynTn/CqM9oO/l6Q6MgLiIS','닉네임1223-4','01098765559','안산시 단원구','롯데백화점','http://localhost:4100/file/97fe3008-dd82-4a62-8f31-276b9b5c11a5.jpeg',1),('email16@email.com','$2b$10$7oeu8lM1.94j2GfD6XwJ7.dWNIWJxMLj3sBMIhqp2Q2P2.NTRJS2G','nickname16','01011111111','경기 성남시 분당구 대왕판교로606번길 45','판교역',NULL,1),('email17@email.com','$2b$10$peyYDv.bHS.gJL.QxvO.ZO377R.Gb8mQXTUJQL0h/UaMFwou47MH.','nickname17','01012341234','경기 성남시 분당구 판교역로 4','판교역',NULL,1),('email18@email.com','$2b$10$d/mQoRmH7h9cC6/NjhPRf.GLmux6.91ak1KDXX3arl2v6AFMuuxaW','nickname18','01012344444','경기 안산시 단원구 갈마지길 5-2','1111',NULL,1),('email22@email.com','$2b$10$Ik/STiT4Stcz62ejy2Ev9uxstdo5w07fftDH.vwJ8cnCYXBq8OJ9m','nickname22','01022223333','경기 안산시 단원구 갈마지길 5-2','2길',NULL,1),('test@example.com','password123','Tester','01012345678','Seoul',NULL,NULL,1),('test2@example.com','password123','Tester2','01022345678','Seoul',NULL,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `board_list_view`
--

/*!50001 DROP VIEW IF EXISTS `board_list_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `board_list_view` AS select `b`.`board_number` AS `board_number`,`b`.`title` AS `title`,`b`.`content` AS `content`,`i`.`image` AS `title_image`,`b`.`favorite_count` AS `favorite_count`,`b`.`comment_count` AS `comment_count`,`b`.`view_count` AS `view_count`,`b`.`write_datetime` AS `write_datetime`,`b`.`writer_email` AS `writer_email`,`u`.`nickname` AS `writer_nickname`,`u`.`profile_image` AS `writer_profile_image` from ((`board` `b` join `user` `u` on((`b`.`writer_email` = `u`.`email`))) left join (select `image`.`board_number` AS `board_number`,any_value(`image`.`image`) AS `image` from `image` group by `image`.`board_number`) `i` on((`b`.`board_number` = `i`.`board_number`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-14 23:58:25
