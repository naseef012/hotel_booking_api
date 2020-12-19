-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 19, 2020 at 02:16 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_bookings`
--

CREATE TABLE `tb_bookings` (
  `id` int(11) NOT NULL,
  `room_number` varchar(250) NOT NULL DEFAULT '0',
  `arrival` datetime NOT NULL DEFAULT current_timestamp(),
  `checkin` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'time for check in',
  `checkout` datetime NOT NULL DEFAULT current_timestamp(),
  `customer_id` int(11) NOT NULL DEFAULT 0,
  `book_type` varchar(250) NOT NULL DEFAULT '0',
  `book_time` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_type` smallint(6) NOT NULL DEFAULT 0 COMMENT '0 ->nothing, 1->partial_payment, 2-> fullpayment',
  `paid_amount` decimal(10,0) NOT NULL,
  `due_amount` decimal(10,0) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 -> default, 1->booked, 2-> checkedout, 3->  checkedin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_bookings`
--

INSERT INTO `tb_bookings` (`id`, `room_number`, `arrival`, `checkin`, `checkout`, `customer_id`, `book_type`, `book_time`, `payment_type`, `paid_amount`, `due_amount`, `status`) VALUES
(1, '301', '2020-12-25 06:00:00', '2020-12-19 17:53:16', '2020-12-27 06:00:00', 1, '0', '2020-12-19 14:20:29', 1, '1000', '0', 2),
(3, '301', '2020-12-28 06:00:00', '2020-12-19 17:53:16', '2020-12-29 06:00:00', 1, '0', '2020-12-19 15:03:15', 1, '1000', '0', 2),
(4, '302', '2020-12-25 06:00:00', '2020-12-19 17:53:16', '2020-12-29 06:00:00', 1, '0', '2020-12-19 15:03:42', 1, '1000', '0', 2),
(5, '202', '2021-01-25 06:00:00', '2020-12-19 17:53:16', '2021-01-29 06:00:00', 4, '0', '2020-12-19 15:22:01', 1, '2000', '0', 2),
(6, '201', '2021-01-25 06:00:00', '2020-12-19 17:53:16', '2021-01-29 06:00:00', 2, '0', '2020-12-19 15:33:06', 0, '5000', '0', 2),
(7, '201', '2021-01-29 08:00:00', '2020-12-19 17:53:16', '2021-01-31 06:00:00', 2, '0', '2020-12-19 15:34:44', 2, '2000', '0', 2),
(8, '401', '2021-01-29 08:00:00', '2020-12-19 17:53:16', '2021-01-31 06:00:00', 3, '0', '2020-12-19 15:39:00', 1, '6000', '0', 2),
(9, '401', '2021-02-19 08:00:00', '2020-12-19 17:53:16', '2021-02-21 06:00:00', 8, '0', '2020-12-19 16:19:23', 1, '6000', '2000', 2),
(10, '401', '2021-03-19 08:00:00', '2020-12-19 17:53:16', '2021-03-21 06:00:00', 5, '0', '2020-12-19 17:47:40', 2, '8000', '0', 2),
(11, '401', '2021-04-01 08:00:00', '2020-12-19 17:57:44', '2021-04-02 06:00:00', 5, '0', '2020-12-19 17:57:44', 1, '3000', '5000', 2),
(12, '401', '2021-04-01 08:00:00', '2020-12-19 18:15:23', '2021-04-02 06:00:00', 5, '0', '2020-12-19 18:15:23', 2, '8000', '0', 2),
(13, '401', '2021-04-01 08:00:00', '2020-12-19 19:01:31', '2021-04-02 06:00:00', 5, '0', '2020-12-19 19:01:31', 1, '3000', '5000', 1),
(14, '201', '2021-04-01 08:00:00', '2020-12-19 19:05:38', '2021-04-02 06:00:00', 8, '0', '2020-12-19 19:05:38', 1, '500', '1500', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_customers`
--

CREATE TABLE `tb_customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `registered_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_customers`
--

INSERT INTO `tb_customers` (`id`, `first_name`, `last_name`, `email`, `phone`, `registered_at`) VALUES
(1, 'Naseef', 'Mohammed', 'naseefmohammed012@gmail.com', '01713079184', '2020-12-19 12:41:07'),
(2, 'Oishi', 'Maniha', 'oishi@gmail.com', '01686520666', '2020-12-19 15:43:02'),
(3, 'Nusrat', 'Sultana', 'nusrat@gmail.com', '01713452416', '2020-12-19 15:43:31'),
(4, 'Esha', 'Samiha', 'nusrat@gmail.com', '017189452416', '2020-12-19 15:43:44'),
(5, 'Rahi', 'Saifur', 'nusrat@gmail.com', '01712894524', '2020-12-19 15:44:42'),
(7, 'Azmain', 'Amin', 'nusrat@gmail.com', '01700706929', '2020-12-19 15:46:47'),
(8, 'Sabbir', 'Ridwan', 'sabbir@gmail.com', '01700706930', '2020-12-19 16:05:28');

-- --------------------------------------------------------

--
-- Table structure for table `tb_payments`
--

CREATE TABLE `tb_payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_rooms`
--

CREATE TABLE `tb_rooms` (
  `id` int(11) NOT NULL,
  `room_number` int(250) NOT NULL DEFAULT 0,
  `price` decimal(10,0) NOT NULL DEFAULT 0,
  `locked` smallint(250) NOT NULL DEFAULT 0 COMMENT '0 -> not booked, 1-> booked',
  `max_persons` int(11) NOT NULL,
  `room_type` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_rooms`
--

INSERT INTO `tb_rooms` (`id`, `room_number`, `price`, `locked`, `max_persons`, `room_type`) VALUES
(1, 201, '2000', 0, 2, 'Couple'),
(2, 202, '2000', 1, 2, 'Couple'),
(3, 301, '3000', 0, 3, 'Executive'),
(4, 302, '3000', 0, 3, 'Executive'),
(5, 303, '3500', 0, 3, 'Business_Suite'),
(6, 401, '8000', 0, 5, 'Studio');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'test', '$2b$10$aVqcV0knWzH3VMQUtOBMO.VQWvqIYfs1.FCu4Kd3SuMe4xH34DYri'),
(2, 'test2', '$2b$10$JXLbCE516zMJu5rnABvJeeVz5tXBDjb5TtSGhEVEmfviFdUQRNwCu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_bookings`
--
ALTER TABLE `tb_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_number` (`room_number`),
  ADD KEY `arrival` (`arrival`),
  ADD KEY `checkout` (`checkout`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `book_time` (`book_time`),
  ADD KEY `checkin` (`checkin`);

--
-- Indexes for table `tb_customers`
--
ALTER TABLE `tb_customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `first_name` (`first_name`),
  ADD KEY `phone` (`phone`),
  ADD KEY `last_name` (`last_name`);

--
-- Indexes for table `tb_payments`
--
ALTER TABLE `tb_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `date` (`date`);

--
-- Indexes for table `tb_rooms`
--
ALTER TABLE `tb_rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `room_number` (`room_number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password` (`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_bookings`
--
ALTER TABLE `tb_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_customers`
--
ALTER TABLE `tb_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_payments`
--
ALTER TABLE `tb_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_rooms`
--
ALTER TABLE `tb_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
