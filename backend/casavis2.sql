-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2025 at 05:50 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `casavis2`
--

-- --------------------------------------------------------

--
-- Table structure for table `analytics_logs`
--

CREATE TABLE `analytics_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `analytics_logs`
--

INSERT INTO `analytics_logs` (`id`, `page`, `ip_address`, `country`, `timestamp`) VALUES
(1, '/home', '127.0.0.1', 'RO', '2025-06-21 15:50:00'),
(2, '/properties', '192.168.1.1', 'RO', '2025-06-21 15:50:10');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `area` int(11) NOT NULL,
  `rooms` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `videoUrl` varchar(512) DEFAULT NULL,
  `thumbnailUrl` varchar(512) DEFAULT NULL,
  `badges` json DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `title`, `price`, `location`, `area`, `rooms`, `type`, `videoUrl`, `thumbnailUrl`, `badges`, `createdAt`, `updatedAt`) VALUES
('1', 'Garsonieră ultracentral', 61000, 'București', 35, 1, 'Apartament cu 1 camera de vânzare', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400', '["Nou", "Redus"]', '2025-06-21 15:45:00', '2025-06-21 15:45:00'),
('2', 'Apartament 2 camere, modern', 85000, 'Cluj-Napoca', 55, 2, 'Apartament cu 2 camere de vânzare', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400', '["Exclusivitate"]', '2025-06-21 15:46:00', '2025-06-21 15:46:00');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `role`, `phone`, `email`, `image`) VALUES
('1', 'Mihai Eminescu', 'Manager', '+40 712 345 678', 'mihai.e@estate.ro', 'https://randomuser.me/api/portraits/men/75.jpg'),
('2', 'Veronica Micle', 'Agent imobiliar senior', '+40 712 345 679', 'veronica.m@estate.ro', 'https://randomuser.me/api/portraits/women/75.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2b$10$your_secure_hash_here', 'admin'); -- IMPORTANT: Replace with a real hashed password

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
