-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 21, 2019 at 04:17 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `commenting_roles`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(10) NOT NULL AUTO_INCREMENT,
  `author` int(10) NOT NULL,
  `timestamp` datetime NOT NULL,
  `message` varchar(500) NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `author`, `timestamp`, `message`) VALUES
(1, 1, '2019-03-15 20:39:39', 'I love the almighty God Jehovah'),
(9, 3, '2019-03-20 14:42:40', 'Testing tests'),
(6, 1, '2019-03-18 19:14:13', 'Another comment after a deletion'),
(4, 5, '2019-03-16 21:43:58', 'The moment js is a great tool ever'),
(5, 3, '2019-03-16 22:05:27', 'As an admin I can confirmm that'),
(7, 1, '2019-03-18 19:32:54', 'Another comment after a deletion'),
(8, 1, '2019-03-18 19:33:34', 'Another comment after a deletion'),
(10, 3, '2019-03-20 14:53:30', 'Testing tests'),
(11, 3, '2019-03-20 14:54:01', 'Testing tests'),
(12, 3, '2019-03-20 14:54:46', 'Testing tests'),
(13, 3, '2019-03-20 15:07:15', 'Testing tests'),
(14, 1, '2019-03-20 15:07:16', 'Testing a comment insertion'),
(15, 3, '2019-03-20 15:14:31', 'Testing tests'),
(16, 1, '2019-03-20 15:14:32', 'Testing a comment insertion'),
(17, 3, '2019-03-20 20:18:09', 'This is edited!'),
(18, 1, '2019-03-20 21:06:32', 'Testing a comment insertion');

-- --------------------------------------------------------

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
CREATE TABLE IF NOT EXISTS `reply` (
  `reply_id` int(10) NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message` varchar(500) NOT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reply`
--

INSERT INTO `reply` (`reply_id`, `parent_id`, `timestamp`, `message`) VALUES
(1, 4, NULL, 'Me too, I find it so important'),
(2, 3, '2019-03-16 21:56:11', 'I love him too, He is great forever'),
(3, 3, '2019-03-16 22:03:45', 'I love him too, He is great forever'),
(4, 3, '2019-03-16 22:05:27', 'I love him too, He is great forever');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `name`) VALUES
(1, 'normal'),
(2, 'moderator'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `role` int(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `role`) VALUES
(1, 'Patrick', 3),
(2, 'patrick', 1),
(3, 'Kalisa', 2),
(4, 'Kalisa', 2),
(5, 'Karangwa', 1),
(6, 'Karara', 3),
(7, 'Karara', 3),
(8, 'Karara', 3),
(9, 'Japheth', 1),
(10, 'Alexis', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
