/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : model

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-12 11:27:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `relun` varchar(16) DEFAULT NULL COMMENT '真实姓名',
  `un` varchar(32) DEFAULT NULL COMMENT '用户名',
  `pwd` varchar(32) DEFAULT NULL COMMENT '密码',
  `tel` varchar(32) DEFAULT NULL COMMENT '电话',
  `qq` varchar(10) DEFAULT NULL COMMENT 'QQ号码',
  `email` varchar(32) DEFAULT NULL COMMENT '电子信箱',
  `role` varchar(255) DEFAULT NULL COMMENT '用户角色权限组 权限 1:管理员 其他参照roles表',
  `theme` varchar(32) DEFAULT 'blue',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unonly` (`un`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES ('1', '系统管理员', 'admin', '123456', null, null, null, '1', 'theme-blue', '2017-01-01 00:00:00');

-- ----------------------------
-- Table structure for cities
-- ----------------------------
DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=426 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cities
-- ----------------------------
INSERT INTO `cities` VALUES ('1', '北京市', '0');
INSERT INTO `cities` VALUES ('2', '天津市', '0');
INSERT INTO `cities` VALUES ('3', '上海市', '0');
INSERT INTO `cities` VALUES ('4', '重庆市', '0');
INSERT INTO `cities` VALUES ('5', '河北省', '0');
INSERT INTO `cities` VALUES ('6', '山西省', '0');
INSERT INTO `cities` VALUES ('7', '台湾省', '0');
INSERT INTO `cities` VALUES ('8', '辽宁省', '0');
INSERT INTO `cities` VALUES ('9', '吉林省', '0');
INSERT INTO `cities` VALUES ('10', '黑龙江省', '0');
INSERT INTO `cities` VALUES ('11', '江苏省', '0');
INSERT INTO `cities` VALUES ('12', '浙江省', '0');
INSERT INTO `cities` VALUES ('13', '安徽省', '0');
INSERT INTO `cities` VALUES ('14', '福建省', '0');
INSERT INTO `cities` VALUES ('15', '江西省', '0');
INSERT INTO `cities` VALUES ('16', '山东省', '0');
INSERT INTO `cities` VALUES ('17', '河南省', '0');
INSERT INTO `cities` VALUES ('18', '湖北省', '0');
INSERT INTO `cities` VALUES ('19', '湖南省', '0');
INSERT INTO `cities` VALUES ('20', '广东省', '0');
INSERT INTO `cities` VALUES ('21', '甘肃省', '0');
INSERT INTO `cities` VALUES ('22', '四川省', '0');
INSERT INTO `cities` VALUES ('23', '贵州省', '0');
INSERT INTO `cities` VALUES ('24', '海南省', '0');
INSERT INTO `cities` VALUES ('25', '云南省', '0');
INSERT INTO `cities` VALUES ('26', '青海省', '0');
INSERT INTO `cities` VALUES ('27', '陕西省', '0');
INSERT INTO `cities` VALUES ('28', '广西', '0');
INSERT INTO `cities` VALUES ('29', '西藏', '0');
INSERT INTO `cities` VALUES ('30', '宁夏', '0');
INSERT INTO `cities` VALUES ('31', '新疆', '0');
INSERT INTO `cities` VALUES ('32', '内蒙古', '0');
INSERT INTO `cities` VALUES ('33', '澳门', '0');
INSERT INTO `cities` VALUES ('34', '香港', '0');
INSERT INTO `cities` VALUES ('35', '北京市', '1');
INSERT INTO `cities` VALUES ('36', '天津市', '2');
INSERT INTO `cities` VALUES ('37', '上海市', '3');
INSERT INTO `cities` VALUES ('38', '重庆市', '4');
INSERT INTO `cities` VALUES ('39', '石家庄市', '5');
INSERT INTO `cities` VALUES ('40', '保定市', '5');
INSERT INTO `cities` VALUES ('41', '唐山市', '5');
INSERT INTO `cities` VALUES ('42', '廊坊市', '5');
INSERT INTO `cities` VALUES ('43', '张家口市', '5');
INSERT INTO `cities` VALUES ('44', '承德市', '5');
INSERT INTO `cities` VALUES ('45', '沧州市', '5');
INSERT INTO `cities` VALUES ('46', '秦皇岛市', '5');
INSERT INTO `cities` VALUES ('47', '衡水市', '5');
INSERT INTO `cities` VALUES ('48', '邢台市', '5');
INSERT INTO `cities` VALUES ('49', '邯郸市', '5');
INSERT INTO `cities` VALUES ('50', '太原市', '6');
INSERT INTO `cities` VALUES ('51', '临汾市', '6');
INSERT INTO `cities` VALUES ('52', '吕梁市', '6');
INSERT INTO `cities` VALUES ('53', '大同市', '6');
INSERT INTO `cities` VALUES ('54', '忻州市', '6');
INSERT INTO `cities` VALUES ('55', '晋中市', '6');
INSERT INTO `cities` VALUES ('56', '晋城市', '6');
INSERT INTO `cities` VALUES ('57', '朔州市', '6');
INSERT INTO `cities` VALUES ('58', '运城市', '6');
INSERT INTO `cities` VALUES ('59', '长治市', '6');
INSERT INTO `cities` VALUES ('60', '阳泉市', '6');
INSERT INTO `cities` VALUES ('61', '台北市', '7');
INSERT INTO `cities` VALUES ('62', '云林县', '7');
INSERT INTO `cities` VALUES ('63', '南投县', '7');
INSERT INTO `cities` VALUES ('64', '台东县', '7');
INSERT INTO `cities` VALUES ('65', '台中县', '7');
INSERT INTO `cities` VALUES ('66', '台中市', '7');
INSERT INTO `cities` VALUES ('67', '台北县', '7');
INSERT INTO `cities` VALUES ('68', '台南县', '7');
INSERT INTO `cities` VALUES ('69', '台南市', '7');
INSERT INTO `cities` VALUES ('70', '嘉义县', '7');
INSERT INTO `cities` VALUES ('71', '嘉义市', '7');
INSERT INTO `cities` VALUES ('72', '基隆市', '7');
INSERT INTO `cities` VALUES ('73', '宜兰县', '7');
INSERT INTO `cities` VALUES ('74', '屏东县', '7');
INSERT INTO `cities` VALUES ('75', '彰化县', '7');
INSERT INTO `cities` VALUES ('76', '新竹县', '7');
INSERT INTO `cities` VALUES ('77', '新竹市', '7');
INSERT INTO `cities` VALUES ('78', '桃园县', '7');
INSERT INTO `cities` VALUES ('79', '澎湖县', '7');
INSERT INTO `cities` VALUES ('80', '花莲县', '7');
INSERT INTO `cities` VALUES ('81', '苗栗县', '7');
INSERT INTO `cities` VALUES ('82', '高雄县', '7');
INSERT INTO `cities` VALUES ('83', '高雄市', '7');
INSERT INTO `cities` VALUES ('84', '沈阳市', '8');
INSERT INTO `cities` VALUES ('85', '大连市', '8');
INSERT INTO `cities` VALUES ('86', '丹东市', '8');
INSERT INTO `cities` VALUES ('87', '抚顺市', '8');
INSERT INTO `cities` VALUES ('88', '朝阳市', '8');
INSERT INTO `cities` VALUES ('89', '本溪市', '8');
INSERT INTO `cities` VALUES ('90', '盘锦市', '8');
INSERT INTO `cities` VALUES ('91', '营口市', '8');
INSERT INTO `cities` VALUES ('92', '葫芦岛市', '8');
INSERT INTO `cities` VALUES ('93', '辽阳市', '8');
INSERT INTO `cities` VALUES ('94', '铁岭市', '8');
INSERT INTO `cities` VALUES ('95', '锦州市', '8');
INSERT INTO `cities` VALUES ('96', '阜新市', '8');
INSERT INTO `cities` VALUES ('97', '鞍山市', '8');
INSERT INTO `cities` VALUES ('98', '长春市', '9');
INSERT INTO `cities` VALUES ('99', '吉林市', '9');
INSERT INTO `cities` VALUES ('100', '四平市', '9');
INSERT INTO `cities` VALUES ('101', '延边朝鲜族自治州', '9');
INSERT INTO `cities` VALUES ('102', '松原市', '9');
INSERT INTO `cities` VALUES ('103', '白城市', '9');
INSERT INTO `cities` VALUES ('104', '白山市', '9');
INSERT INTO `cities` VALUES ('105', '辽源市', '9');
INSERT INTO `cities` VALUES ('106', '通化市', '9');
INSERT INTO `cities` VALUES ('107', '哈尔滨市', '10');
INSERT INTO `cities` VALUES ('108', '七台河市', '10');
INSERT INTO `cities` VALUES ('109', '伊 春 市', '10');
INSERT INTO `cities` VALUES ('110', '佳木斯市', '10');
INSERT INTO `cities` VALUES ('111', '双鸭山市', '10');
INSERT INTO `cities` VALUES ('112', '大 庆 市', '10');
INSERT INTO `cities` VALUES ('113', '大兴安岭地区', '10');
INSERT INTO `cities` VALUES ('114', '牡丹江市', '10');
INSERT INTO `cities` VALUES ('115', '绥 化 市', '10');
INSERT INTO `cities` VALUES ('116', '鸡 西 市', '10');
INSERT INTO `cities` VALUES ('117', '鹤 岗 市', '10');
INSERT INTO `cities` VALUES ('118', '黑 河 市', '10');
INSERT INTO `cities` VALUES ('119', '齐齐哈尔市', '10');
INSERT INTO `cities` VALUES ('120', '南京市', '11');
INSERT INTO `cities` VALUES ('121', '南通市', '11');
INSERT INTO `cities` VALUES ('122', '宿迁市', '11');
INSERT INTO `cities` VALUES ('123', '常州市', '11');
INSERT INTO `cities` VALUES ('124', '徐州市', '11');
INSERT INTO `cities` VALUES ('125', '扬州市', '11');
INSERT INTO `cities` VALUES ('126', '无锡市', '11');
INSERT INTO `cities` VALUES ('127', '泰州市', '11');
INSERT INTO `cities` VALUES ('128', '淮安市', '11');
INSERT INTO `cities` VALUES ('129', '盐城市', '11');
INSERT INTO `cities` VALUES ('130', '苏州市', '11');
INSERT INTO `cities` VALUES ('131', '连云港市', '11');
INSERT INTO `cities` VALUES ('132', '镇江市', '11');
INSERT INTO `cities` VALUES ('133', '杭州市', '12');
INSERT INTO `cities` VALUES ('134', '丽水市', '12');
INSERT INTO `cities` VALUES ('135', '台州市', '12');
INSERT INTO `cities` VALUES ('136', '嘉兴市', '12');
INSERT INTO `cities` VALUES ('137', '宁波市', '12');
INSERT INTO `cities` VALUES ('138', '温州市', '12');
INSERT INTO `cities` VALUES ('139', '湖州市', '12');
INSERT INTO `cities` VALUES ('140', '绍兴市', '12');
INSERT INTO `cities` VALUES ('141', '舟山市', '12');
INSERT INTO `cities` VALUES ('142', '衢州市', '12');
INSERT INTO `cities` VALUES ('143', '金华市', '12');
INSERT INTO `cities` VALUES ('144', '合肥市', '13');
INSERT INTO `cities` VALUES ('145', '亳州市', '13');
INSERT INTO `cities` VALUES ('146', '六安市', '13');
INSERT INTO `cities` VALUES ('147', '安庆市', '13');
INSERT INTO `cities` VALUES ('148', '宣城市', '13');
INSERT INTO `cities` VALUES ('149', '宿州市', '13');
INSERT INTO `cities` VALUES ('150', '巢湖市', '13');
INSERT INTO `cities` VALUES ('151', '池州市', '13');
INSERT INTO `cities` VALUES ('152', '淮北市', '13');
INSERT INTO `cities` VALUES ('153', '淮南市', '13');
INSERT INTO `cities` VALUES ('154', '滁州市', '13');
INSERT INTO `cities` VALUES ('155', '芜湖市', '13');
INSERT INTO `cities` VALUES ('156', '蚌埠市', '13');
INSERT INTO `cities` VALUES ('157', '铜陵市', '13');
INSERT INTO `cities` VALUES ('158', '阜阳市', '13');
INSERT INTO `cities` VALUES ('159', '马鞍山市', '13');
INSERT INTO `cities` VALUES ('160', '黄山市', '13');
INSERT INTO `cities` VALUES ('161', '福州市', '14');
INSERT INTO `cities` VALUES ('162', '三明市', '14');
INSERT INTO `cities` VALUES ('163', '南平市', '14');
INSERT INTO `cities` VALUES ('164', '厦门市', '14');
INSERT INTO `cities` VALUES ('165', '宁德市', '14');
INSERT INTO `cities` VALUES ('166', '泉州市', '14');
INSERT INTO `cities` VALUES ('167', '漳州市', '14');
INSERT INTO `cities` VALUES ('168', '莆田市', '14');
INSERT INTO `cities` VALUES ('169', '龙岩市', '14');
INSERT INTO `cities` VALUES ('170', '南昌市', '15');
INSERT INTO `cities` VALUES ('171', '上饶市', '15');
INSERT INTO `cities` VALUES ('172', '九江市', '15');
INSERT INTO `cities` VALUES ('173', '吉安市', '15');
INSERT INTO `cities` VALUES ('174', '宜春市', '15');
INSERT INTO `cities` VALUES ('175', '抚州市', '15');
INSERT INTO `cities` VALUES ('176', '新余市', '15');
INSERT INTO `cities` VALUES ('177', '景德镇市', '15');
INSERT INTO `cities` VALUES ('178', '萍乡市', '15');
INSERT INTO `cities` VALUES ('179', '赣州市', '15');
INSERT INTO `cities` VALUES ('180', '鹰潭市', '15');
INSERT INTO `cities` VALUES ('181', '济南市', '16');
INSERT INTO `cities` VALUES ('182', '东营市', '16');
INSERT INTO `cities` VALUES ('183', '临沂市', '16');
INSERT INTO `cities` VALUES ('184', '威海市', '16');
INSERT INTO `cities` VALUES ('185', '德州市', '16');
INSERT INTO `cities` VALUES ('186', '日照市', '16');
INSERT INTO `cities` VALUES ('187', '枣庄市', '16');
INSERT INTO `cities` VALUES ('188', '泰安市', '16');
INSERT INTO `cities` VALUES ('189', '济宁市', '16');
INSERT INTO `cities` VALUES ('190', '淄博市', '16');
INSERT INTO `cities` VALUES ('191', '滨州市', '16');
INSERT INTO `cities` VALUES ('192', '潍坊市', '16');
INSERT INTO `cities` VALUES ('193', '烟台市', '16');
INSERT INTO `cities` VALUES ('194', '聊城市', '16');
INSERT INTO `cities` VALUES ('195', '莱芜市', '16');
INSERT INTO `cities` VALUES ('196', '菏泽市', '16');
INSERT INTO `cities` VALUES ('197', '青岛市', '16');
INSERT INTO `cities` VALUES ('198', '郑州市', '17');
INSERT INTO `cities` VALUES ('199', '三门峡市', '17');
INSERT INTO `cities` VALUES ('200', '信阳市', '17');
INSERT INTO `cities` VALUES ('201', '南阳市', '17');
INSERT INTO `cities` VALUES ('202', '周口市', '17');
INSERT INTO `cities` VALUES ('203', '商丘市', '17');
INSERT INTO `cities` VALUES ('204', '安阳市', '17');
INSERT INTO `cities` VALUES ('205', '平顶山市', '17');
INSERT INTO `cities` VALUES ('206', '开封市', '17');
INSERT INTO `cities` VALUES ('207', '新乡市', '17');
INSERT INTO `cities` VALUES ('208', '洛阳市', '17');
INSERT INTO `cities` VALUES ('209', '济源市', '17');
INSERT INTO `cities` VALUES ('210', '漯河市', '17');
INSERT INTO `cities` VALUES ('211', '濮阳市', '17');
INSERT INTO `cities` VALUES ('212', '焦作市', '17');
INSERT INTO `cities` VALUES ('213', '许昌市', '17');
INSERT INTO `cities` VALUES ('214', '驻马店市', '17');
INSERT INTO `cities` VALUES ('215', '鹤壁市', '17');
INSERT INTO `cities` VALUES ('216', '武汉市', '18');
INSERT INTO `cities` VALUES ('217', '仙桃市', '18');
INSERT INTO `cities` VALUES ('218', '十堰市', '18');
INSERT INTO `cities` VALUES ('219', '咸宁市', '18');
INSERT INTO `cities` VALUES ('220', '天门市', '18');
INSERT INTO `cities` VALUES ('221', '孝感市', '18');
INSERT INTO `cities` VALUES ('222', '宜昌市', '18');
INSERT INTO `cities` VALUES ('223', '恩施土家族苗族自治州', '18');
INSERT INTO `cities` VALUES ('224', '潜江市', '18');
INSERT INTO `cities` VALUES ('225', '神农架林区', '18');
INSERT INTO `cities` VALUES ('226', '荆州市', '18');
INSERT INTO `cities` VALUES ('227', '荆门市', '18');
INSERT INTO `cities` VALUES ('228', '襄樊市', '18');
INSERT INTO `cities` VALUES ('229', '鄂州市', '18');
INSERT INTO `cities` VALUES ('230', '随州市', '18');
INSERT INTO `cities` VALUES ('231', '黄冈市', '18');
INSERT INTO `cities` VALUES ('232', '黄石市', '18');
INSERT INTO `cities` VALUES ('233', '长沙市', '19');
INSERT INTO `cities` VALUES ('234', '娄底市', '19');
INSERT INTO `cities` VALUES ('235', '岳阳市', '19');
INSERT INTO `cities` VALUES ('236', '常德市', '19');
INSERT INTO `cities` VALUES ('237', '张家界市', '19');
INSERT INTO `cities` VALUES ('238', '怀化市', '19');
INSERT INTO `cities` VALUES ('239', '株洲市', '19');
INSERT INTO `cities` VALUES ('240', '永州市', '19');
INSERT INTO `cities` VALUES ('241', '湘潭市', '19');
INSERT INTO `cities` VALUES ('242', '湘西土家族苗族自治州', '19');
INSERT INTO `cities` VALUES ('243', '益阳市', '19');
INSERT INTO `cities` VALUES ('244', '衡阳市', '19');
INSERT INTO `cities` VALUES ('245', '邵阳市', '19');
INSERT INTO `cities` VALUES ('246', '郴州市', '19');
INSERT INTO `cities` VALUES ('247', '广州市', '20');
INSERT INTO `cities` VALUES ('248', '东莞市', '20');
INSERT INTO `cities` VALUES ('249', '中山市', '20');
INSERT INTO `cities` VALUES ('250', '云浮市', '20');
INSERT INTO `cities` VALUES ('251', '佛山市', '20');
INSERT INTO `cities` VALUES ('252', '惠州市', '20');
INSERT INTO `cities` VALUES ('253', '揭阳市', '20');
INSERT INTO `cities` VALUES ('254', '梅州市', '20');
INSERT INTO `cities` VALUES ('255', '汕头市', '20');
INSERT INTO `cities` VALUES ('256', '汕尾市', '20');
INSERT INTO `cities` VALUES ('257', '江门市', '20');
INSERT INTO `cities` VALUES ('258', '河源市', '20');
INSERT INTO `cities` VALUES ('259', '深圳市', '20');
INSERT INTO `cities` VALUES ('260', '清远市', '20');
INSERT INTO `cities` VALUES ('261', '湛江市', '20');
INSERT INTO `cities` VALUES ('262', '潮州市', '20');
INSERT INTO `cities` VALUES ('263', '珠海市', '20');
INSERT INTO `cities` VALUES ('264', '肇庆市', '20');
INSERT INTO `cities` VALUES ('265', '茂名市', '20');
INSERT INTO `cities` VALUES ('266', '阳江市', '20');
INSERT INTO `cities` VALUES ('267', '韶关市', '20');
INSERT INTO `cities` VALUES ('268', '兰州市', '21');
INSERT INTO `cities` VALUES ('269', '临夏回族自治州', '21');
INSERT INTO `cities` VALUES ('270', '嘉峪关市', '21');
INSERT INTO `cities` VALUES ('271', '天水市', '21');
INSERT INTO `cities` VALUES ('272', '定西市', '21');
INSERT INTO `cities` VALUES ('273', '平凉市', '21');
INSERT INTO `cities` VALUES ('274', '庆阳市', '21');
INSERT INTO `cities` VALUES ('275', '张掖市', '21');
INSERT INTO `cities` VALUES ('276', '武威市', '21');
INSERT INTO `cities` VALUES ('277', '甘南藏族自治州', '21');
INSERT INTO `cities` VALUES ('278', '白银市', '21');
INSERT INTO `cities` VALUES ('279', '酒泉市', '21');
INSERT INTO `cities` VALUES ('280', '金昌市', '21');
INSERT INTO `cities` VALUES ('281', '陇南市', '21');
INSERT INTO `cities` VALUES ('282', '成都市', '22');
INSERT INTO `cities` VALUES ('283', '乐山市', '22');
INSERT INTO `cities` VALUES ('284', '内江市', '22');
INSERT INTO `cities` VALUES ('285', '凉山彝族自治州', '22');
INSERT INTO `cities` VALUES ('286', '南充市', '22');
INSERT INTO `cities` VALUES ('287', '宜宾市', '22');
INSERT INTO `cities` VALUES ('288', '巴中市', '22');
INSERT INTO `cities` VALUES ('289', '广元市', '22');
INSERT INTO `cities` VALUES ('290', '广安市', '22');
INSERT INTO `cities` VALUES ('291', '德阳市', '22');
INSERT INTO `cities` VALUES ('292', '攀枝花市', '22');
INSERT INTO `cities` VALUES ('293', '泸州市', '22');
INSERT INTO `cities` VALUES ('294', '甘孜藏族自治州', '22');
INSERT INTO `cities` VALUES ('295', '眉山市', '22');
INSERT INTO `cities` VALUES ('296', '绵阳市', '22');
INSERT INTO `cities` VALUES ('297', '自贡市', '22');
INSERT INTO `cities` VALUES ('298', '资阳市', '22');
INSERT INTO `cities` VALUES ('299', '达州市', '22');
INSERT INTO `cities` VALUES ('300', '遂宁市', '22');
INSERT INTO `cities` VALUES ('301', '阿坝藏族羌族自治州', '22');
INSERT INTO `cities` VALUES ('302', '雅安市', '22');
INSERT INTO `cities` VALUES ('303', '贵阳市', '23');
INSERT INTO `cities` VALUES ('304', '六盘水市', '23');
INSERT INTO `cities` VALUES ('305', '安顺市', '23');
INSERT INTO `cities` VALUES ('306', '毕节地区', '23');
INSERT INTO `cities` VALUES ('307', '遵义市', '23');
INSERT INTO `cities` VALUES ('308', '铜仁地区', '23');
INSERT INTO `cities` VALUES ('309', '黔东南苗族侗族自治州', '23');
INSERT INTO `cities` VALUES ('310', '黔南布依族苗族自治州', '23');
INSERT INTO `cities` VALUES ('311', '黔西南布依族苗族自治州', '23');
INSERT INTO `cities` VALUES ('312', '海口市', '24');
INSERT INTO `cities` VALUES ('313', '万宁市', '24');
INSERT INTO `cities` VALUES ('314', '三亚市', '24');
INSERT INTO `cities` VALUES ('315', '东方市', '24');
INSERT INTO `cities` VALUES ('316', '临高县', '24');
INSERT INTO `cities` VALUES ('317', '乐东黎族自治县', '24');
INSERT INTO `cities` VALUES ('318', '五指山市', '24');
INSERT INTO `cities` VALUES ('319', '保亭黎族苗族自治县', '24');
INSERT INTO `cities` VALUES ('320', '儋州市', '24');
INSERT INTO `cities` VALUES ('321', '定安县', '24');
INSERT INTO `cities` VALUES ('322', '屯昌县', '24');
INSERT INTO `cities` VALUES ('323', '文昌市', '24');
INSERT INTO `cities` VALUES ('324', '昌江黎族自治县', '24');
INSERT INTO `cities` VALUES ('325', '澄迈县', '24');
INSERT INTO `cities` VALUES ('326', '琼中黎族苗族自治县', '24');
INSERT INTO `cities` VALUES ('327', '琼海市', '24');
INSERT INTO `cities` VALUES ('328', '白沙黎族自治县', '24');
INSERT INTO `cities` VALUES ('329', '陵水黎族自治县', '24');
INSERT INTO `cities` VALUES ('330', '昆明市', '25');
INSERT INTO `cities` VALUES ('331', '临沧市', '25');
INSERT INTO `cities` VALUES ('332', '丽江市', '25');
INSERT INTO `cities` VALUES ('333', '保山市', '25');
INSERT INTO `cities` VALUES ('334', '大理白族自治州', '25');
INSERT INTO `cities` VALUES ('335', '德宏傣族景颇族自治州', '25');
INSERT INTO `cities` VALUES ('336', '怒江傈傈族自治州', '25');
INSERT INTO `cities` VALUES ('337', '思茅市', '25');
INSERT INTO `cities` VALUES ('338', '文山壮族苗族自治州', '25');
INSERT INTO `cities` VALUES ('339', '昭通市', '25');
INSERT INTO `cities` VALUES ('340', '曲靖市', '25');
INSERT INTO `cities` VALUES ('341', '楚雄彝族自治州', '25');
INSERT INTO `cities` VALUES ('342', '玉溪市', '25');
INSERT INTO `cities` VALUES ('343', '红河哈尼族彝族自治州', '25');
INSERT INTO `cities` VALUES ('344', '西双版纳傣族自治州', '25');
INSERT INTO `cities` VALUES ('345', '迪庆藏族自治州', '25');
INSERT INTO `cities` VALUES ('346', '西宁市', '26');
INSERT INTO `cities` VALUES ('347', '果洛藏族自治州', '26');
INSERT INTO `cities` VALUES ('348', '海东地区', '26');
INSERT INTO `cities` VALUES ('349', '海北藏族自治州', '26');
INSERT INTO `cities` VALUES ('350', '海南藏族自治州', '26');
INSERT INTO `cities` VALUES ('351', '海西蒙古族藏族自治州', '26');
INSERT INTO `cities` VALUES ('352', '玉树藏族自治州', '26');
INSERT INTO `cities` VALUES ('353', '黄南藏族自治州', '26');
INSERT INTO `cities` VALUES ('354', '西安市', '27');
INSERT INTO `cities` VALUES ('355', '咸阳市', '27');
INSERT INTO `cities` VALUES ('356', '商洛市', '27');
INSERT INTO `cities` VALUES ('357', '安康市', '27');
INSERT INTO `cities` VALUES ('358', '宝鸡市', '27');
INSERT INTO `cities` VALUES ('359', '延安市', '27');
INSERT INTO `cities` VALUES ('360', '榆林市', '27');
INSERT INTO `cities` VALUES ('361', '汉中市', '27');
INSERT INTO `cities` VALUES ('362', '渭南市', '27');
INSERT INTO `cities` VALUES ('363', '铜川市', '27');
INSERT INTO `cities` VALUES ('364', '桂林市', '28');
INSERT INTO `cities` VALUES ('365', '北海市', '28');
INSERT INTO `cities` VALUES ('366', '南宁市', '28');
INSERT INTO `cities` VALUES ('367', '崇左市', '28');
INSERT INTO `cities` VALUES ('368', '来宾市', '28');
INSERT INTO `cities` VALUES ('369', '柳州市', '28');
INSERT INTO `cities` VALUES ('370', '梧州市', '28');
INSERT INTO `cities` VALUES ('371', '河池市', '28');
INSERT INTO `cities` VALUES ('372', '玉林市', '28');
INSERT INTO `cities` VALUES ('373', '百色市', '28');
INSERT INTO `cities` VALUES ('374', '贵港市', '28');
INSERT INTO `cities` VALUES ('375', '贺州市', '28');
INSERT INTO `cities` VALUES ('376', '钦州市', '28');
INSERT INTO `cities` VALUES ('377', '防城港市', '28');
INSERT INTO `cities` VALUES ('378', '拉萨市', '29');
INSERT INTO `cities` VALUES ('379', '山南地区', '29');
INSERT INTO `cities` VALUES ('380', '日喀则地区', '29');
INSERT INTO `cities` VALUES ('381', '昌都地区', '29');
INSERT INTO `cities` VALUES ('382', '林芝地区', '29');
INSERT INTO `cities` VALUES ('383', '那曲地区', '29');
INSERT INTO `cities` VALUES ('384', '阿里地区', '29');
INSERT INTO `cities` VALUES ('385', '中卫市', '30');
INSERT INTO `cities` VALUES ('386', '吴忠市', '30');
INSERT INTO `cities` VALUES ('387', '固原市', '30');
INSERT INTO `cities` VALUES ('388', '石嘴山市', '30');
INSERT INTO `cities` VALUES ('389', '银川市', '30');
INSERT INTO `cities` VALUES ('390', '乌鲁木齐市', '31');
INSERT INTO `cities` VALUES ('391', '乌苏市', '31');
INSERT INTO `cities` VALUES ('392', '五家渠市', '31');
INSERT INTO `cities` VALUES ('393', '伊宁市', '31');
INSERT INTO `cities` VALUES ('394', '克拉玛依市', '31');
INSERT INTO `cities` VALUES ('395', '博乐市', '31');
INSERT INTO `cities` VALUES ('396', '吐鲁番市', '31');
INSERT INTO `cities` VALUES ('397', '和田市', '31');
INSERT INTO `cities` VALUES ('398', '哈密市', '31');
INSERT INTO `cities` VALUES ('399', '喀什市', '31');
INSERT INTO `cities` VALUES ('400', '图木舒克市', '31');
INSERT INTO `cities` VALUES ('401', '塔城市', '31');
INSERT INTO `cities` VALUES ('402', '奎屯市', '31');
INSERT INTO `cities` VALUES ('403', '库尔勒市', '31');
INSERT INTO `cities` VALUES ('404', '昌吉市　', '31');
INSERT INTO `cities` VALUES ('405', '石河子市　', '31');
INSERT INTO `cities` VALUES ('406', '米泉市', '31');
INSERT INTO `cities` VALUES ('407', '阜康市', '31');
INSERT INTO `cities` VALUES ('408', '阿克苏市', '31');
INSERT INTO `cities` VALUES ('409', '阿勒泰市', '31');
INSERT INTO `cities` VALUES ('410', '阿图什市', '31');
INSERT INTO `cities` VALUES ('411', '阿拉尔市', '31');
INSERT INTO `cities` VALUES ('412', '呼和浩特市', '32');
INSERT INTO `cities` VALUES ('413', '乌兰察布市', '32');
INSERT INTO `cities` VALUES ('414', '乌海市', '32');
INSERT INTO `cities` VALUES ('415', '兴安盟', '32');
INSERT INTO `cities` VALUES ('416', '包头市', '32');
INSERT INTO `cities` VALUES ('417', '呼伦贝尔市', '32');
INSERT INTO `cities` VALUES ('418', '巴彦淖尔市', '32');
INSERT INTO `cities` VALUES ('419', '赤峰市', '32');
INSERT INTO `cities` VALUES ('420', '通辽市', '32');
INSERT INTO `cities` VALUES ('421', '鄂尔多斯市', '32');
INSERT INTO `cities` VALUES ('422', '锡林郭勒盟', '32');
INSERT INTO `cities` VALUES ('423', '阿拉善盟', '32');
INSERT INTO `cities` VALUES ('424', '澳门', '33');
INSERT INTO `cities` VALUES ('425', '香港', '34');

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `id` int(1) NOT NULL COMMENT 'uid',
  `kw` varchar(64) DEFAULT NULL,
  `nokw` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='关注相当于触发关键字 无匹配相当于触发关键字';

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES ('1', '文字回复', '语音回复');

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `f0` varchar(32) DEFAULT '图片文档1' COMMENT '图片文件夹名称',
  `f1` varchar(32) DEFAULT '图片文档2' COMMENT '图片文件夹名称',
  `f2` varchar(32) DEFAULT '图片文档3' COMMENT '图片文件夹名称',
  `f3` varchar(32) DEFAULT '图片文档4' COMMENT '图片文件夹名称',
  `f4` varchar(32) DEFAULT '图片文档5' COMMENT '图片文件夹名称',
  `f5` varchar(32) DEFAULT '图片文档6' COMMENT '图片文件夹名称',
  `f6` varchar(32) DEFAULT '图片文档7' COMMENT '图片文件夹名称',
  `f7` varchar(32) DEFAULT '图片文档8' COMMENT '图片文件夹名称',
  `f8` varchar(32) DEFAULT '图片文档9' COMMENT '图片文件夹名称',
  `f9` varchar(32) DEFAULT '图片文档10' COMMENT '图片文件夹名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of images
-- ----------------------------
INSERT INTO `images` VALUES ('1', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('2', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('3', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('4', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('5', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('6', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('7', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('8', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('9', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('10', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('11', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('12', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');
INSERT INTO `images` VALUES ('13', '图片文档1', '图片文档2', '图片文档3', '图片文档4', '图片文档5', '图片文档6', '图片文档7', '图片文档8', '图片文档9', '图片文档10');

-- ----------------------------
-- Table structure for key_replays
-- ----------------------------
DROP TABLE IF EXISTS `key_replays`;
CREATE TABLE `key_replays` (
  `kw` varchar(32) NOT NULL DEFAULT '' COMMENT '关键字',
  `rid` bigint(20) DEFAULT NULL COMMENT '回复id',
  `rtyp` char(1) DEFAULT NULL COMMENT '回复类型:t,o,m,a,v',
  `ms` int(1) DEFAULT NULL COMMENT '匹配模式:1,2',
  PRIMARY KEY (`kw`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of key_replays
-- ----------------------------
INSERT INTO `key_replays` VALUES ('单图文回复', '1', 'o', '1');
INSERT INTO `key_replays` VALUES ('多图文', '1', 'm', '1');
INSERT INTO `key_replays` VALUES ('文字回复', '1', 't', '1');
INSERT INTO `key_replays` VALUES ('视频回复', '1', 'v', '1');
INSERT INTO `key_replays` VALUES ('语音回复', '1', 'a', '1');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL COMMENT 'uid',
  `menu` text COMMENT '菜单项',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '[{\"typ\":\"res_url\",\"data\":\"http://zajindan.rolgoo.cn/wap/index.html?uid=1\",\"tit\":\"测试\",\"subdata\":null}]');

-- ----------------------------
-- Table structure for ret_art_more
-- ----------------------------
DROP TABLE IF EXISTS `ret_art_more`;
CREATE TABLE `ret_art_more` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tit` varchar(128) NOT NULL,
  `img` varchar(255) DEFAULT 'http://static.uhqq.com/demo/art.jpg',
  `url` varchar(255) DEFAULT NULL,
  `tit1` varchar(32) NOT NULL,
  `img1` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url1` varchar(255) DEFAULT NULL,
  `tit2` varchar(128) DEFAULT NULL,
  `img2` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url2` varchar(255) DEFAULT NULL,
  `tit3` varchar(128) DEFAULT NULL,
  `img3` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url3` varchar(255) DEFAULT NULL,
  `tit4` varchar(128) DEFAULT NULL,
  `img4` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url4` varchar(255) DEFAULT NULL,
  `tit5` varchar(128) DEFAULT NULL,
  `img5` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url5` varchar(255) DEFAULT NULL,
  `tit6` varchar(128) DEFAULT NULL,
  `img6` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url6` varchar(255) DEFAULT NULL,
  `tit7` varchar(128) DEFAULT NULL,
  `img7` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url7` varchar(255) DEFAULT NULL,
  `tit8` varchar(128) DEFAULT NULL,
  `img8` varchar(255) DEFAULT 'http://static.uhqq.com/demo/artm.jpg',
  `url8` varchar(255) DEFAULT NULL,
  `kwms` tinyint(1) DEFAULT '1' COMMENT '1 完全匹配 2 模糊匹配',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of ret_art_more
-- ----------------------------
INSERT INTO `ret_art_more` VALUES ('1', '多图文回复1', 'http://static.uhqq.com/demo/art.jpg', null, '多图文回复2', 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, null, 'http://static.uhqq.com/demo/artm.jpg', null, '1');

-- ----------------------------
-- Table structure for ret_art_one
-- ----------------------------
DROP TABLE IF EXISTS `ret_art_one`;
CREATE TABLE `ret_art_one` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tit` varchar(128) DEFAULT NULL,
  `img` varchar(255) DEFAULT 'http://static.uhqq.com/demo/art.jpg',
  `des` varchar(1024) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `kwms` tinyint(1) DEFAULT '1' COMMENT '1 完全匹配 2 模糊匹配',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of ret_art_one
-- ----------------------------
INSERT INTO `ret_art_one` VALUES ('1', '单图文', 'http://static.uhqq.com/demo/art.jpg', '单图文回复测试', null, '1');

-- ----------------------------
-- Table structure for ret_audio
-- ----------------------------
DROP TABLE IF EXISTS `ret_audio`;
CREATE TABLE `ret_audio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tit` varchar(32) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `kwms` tinyint(1) DEFAULT '1' COMMENT '1 完全匹配 2 模糊匹配',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of ret_audio
-- ----------------------------
INSERT INTO `ret_audio` VALUES ('1', '语音', 'http://zajindan.rolgoo.cn/cs/bonny.mp3', '1');

-- ----------------------------
-- Table structure for ret_text
-- ----------------------------
DROP TABLE IF EXISTS `ret_text`;
CREATE TABLE `ret_text` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tit` varchar(32) DEFAULT NULL COMMENT '回复标识',
  `con` text,
  `kwms` tinyint(1) DEFAULT '1' COMMENT '1 完全匹配 2 模糊匹配',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of ret_text
-- ----------------------------
INSERT INTO `ret_text` VALUES ('1', '文字', '文字回复测试[微笑]', '1');

-- ----------------------------
-- Table structure for ret_video
-- ----------------------------
DROP TABLE IF EXISTS `ret_video`;
CREATE TABLE `ret_video` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tit` varchar(32) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `kwms` tinyint(1) DEFAULT '1' COMMENT '1 完全匹配 2 模糊匹配',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of ret_video
-- ----------------------------
INSERT INTO `ret_video` VALUES ('1', '视频', 'http://zajindan.rolgoo.cn/cs/happyfit2.mp4', '1');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tit` varchar(64) NOT NULL COMMENT '机构名称',
  `qxarr` text COMMENT '权限数组',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='组织机构';

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '管理员', '[\"set\\/account\",\"set\\/setpwd\",\"hygl\\/lbs\",\"hygl\\/gspp_edit\",\"hygl\\/gc_msg\",\"hygl\\/news\",\"hygl\\/lys\",\"hygl\\/cpxl\",\"hygl\\/cp\",\"hygl\\/dllv\",\"hygl\\/dl\",\"set\\/role\",\"set\\/auth\",\"set\\/user\"]');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xid` varchar(32) DEFAULT NULL COMMENT 'openid',
  `unick` varchar(64) DEFAULT NULL COMMENT '昵称',
  `upic` varchar(255) DEFAULT NULL COMMENT '头像',
  `gz` tinyint(1) DEFAULT '1' COMMENT '是否关注:0取消关注，1正在关注',
  `ctime` datetime DEFAULT NULL COMMENT '关注时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'obO84wUO1XSEoE0g3dwiZayQNowI', '丶笔调', 'http://wx.qlogo.cn/mmopen/MtpKnYKGZ2CiatK9hJOvB9eIicxhw8uxPRXmCsO4BKIR163pIrr9icYxXGrniaYfKegljzwOGFUicXEcmQMRM12rZlabO4qAL5uRv/0', '1', '2017-01-24 10:51:40');

-- ----------------------------
-- Table structure for wx_set
-- ----------------------------
DROP TABLE IF EXISTS `wx_set`;
CREATE TABLE `wx_set` (
  `id` tinyint(1) NOT NULL,
  `wgn` varchar(15) DEFAULT NULL COMMENT '公众号原始ID',
  `appId` varchar(18) DEFAULT NULL COMMENT '开发者AppId',
  `appSecret` varchar(32) DEFAULT NULL COMMENT '开发者AppSecret',
  `token` varchar(32) DEFAULT NULL COMMENT '服务器配置Token',
  `wapi` tinyint(1) DEFAULT '0' COMMENT '是否获得高级接口权限',
  `wok` tinyint(1) DEFAULT '0' COMMENT '是否与微信公众平台对接',
  `mchId` varchar(10) DEFAULT NULL,
  `partnerKey` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_set
-- ----------------------------
INSERT INTO `wx_set` VALUES ('1', 'gh_2ac48e892965', 'wxe5fd2eed46a3d0dc', '0258bea88692529e20d7b19bcaa0681e', '24ce3096b146e4e63eae25535efbfbec', '1', '1', null, null);
