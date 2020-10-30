-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 30-10-2020 a las 05:43:15
-- Versión del servidor: 8.0.18
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sisvet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cirugia`
--

DROP TABLE IF EXISTS `cirugia`;
CREATE TABLE IF NOT EXISTS `cirugia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVeterinario` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` text CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idVeterinario` (`idVeterinario`),
  KEY `idMascota` (`idMascota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

DROP TABLE IF EXISTS `consulta`;
CREATE TABLE IF NOT EXISTS `consulta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVeterinario` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` text CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `diagnostico` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `tratamiento` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idVeterinario` (`idVeterinario`),
  KEY `idMascota` (`idMascota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
CREATE TABLE IF NOT EXISTS `mascotas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idDuenio` int(11) NOT NULL,
  `nombre` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `especie` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `raza` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `color` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `fecha_nacimiento` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idDuenio` (`idDuenio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `owner`
--

DROP TABLE IF EXISTS `owner`;
CREATE TABLE IF NOT EXISTS `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombe` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

DROP TABLE IF EXISTS `vacuna`;
CREATE TABLE IF NOT EXISTS `vacuna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVeterinario` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL,
  `nombre` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `fecha_aplicacion` date NOT NULL,
  `proxima_aplicacion` date NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idVeterinario` (`idVeterinario`),
  KEY `idMascota` (`idMascota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinaria`
--

DROP TABLE IF EXISTS `veterinaria`;
CREATE TABLE IF NOT EXISTS `veterinaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `pasword` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `veterinaria`
--

INSERT INTO `veterinaria` (`id`, `nombre`, `telefono`, `email`, `pasword`, `habilitado`, `eliminado`, `created_at`) VALUES
(1, 'franco', 'Estrella', 'francoestrella55@gmail.co', '2616637145', 0, 0, '2020-10-29 04:58:08'),
(2, 'vicky', 'Estrella', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 0, '2020-10-30 02:46:47'),
(3, 'marilyn', 'sanchez', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 1, '2020-10-30 03:16:43'),
(4, 'jorge', 'Estrella', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 0, '2020-10-30 03:18:09'),
(5, 'marilyn', 'sanchez', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 0, '2020-10-30 04:48:07'),
(6, 'marilyn', 'sanchez', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 0, '2020-10-30 04:50:57'),
(7, 'marilyn', 'sanchez', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 0, '2020-10-30 04:51:56'),
(8, 'marilyn', 'sanchez', 'francoestrella55@gmail.co', '50a288fa9b9e596f63ae24a11f95ff096b529157', 0, 0, '2020-10-30 04:52:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

DROP TABLE IF EXISTS `veterinarios`;
CREATE TABLE IF NOT EXISTS `veterinarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVeterinaria` int(11) NOT NULL,
  `nombre` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `matricula` int(6) NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idVeterinaria` (`idVeterinaria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cirugia`
--
ALTER TABLE `cirugia`
  ADD CONSTRAINT `cirugia_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `mascotas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cirugia_ibfk_2` FOREIGN KEY (`idVeterinario`) REFERENCES `veterinarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`idMascota`) REFERENCES `mascotas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `consulta_ibfk_3` FOREIGN KEY (`idVeterinario`) REFERENCES `veterinarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`idDuenio`) REFERENCES `owner` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD CONSTRAINT `vacuna_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `mascotas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vacuna_ibfk_2` FOREIGN KEY (`idVeterinario`) REFERENCES `veterinarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD CONSTRAINT `veterinarios_ibfk_1` FOREIGN KEY (`idVeterinaria`) REFERENCES `veterinaria` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
