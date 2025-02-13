import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserName } from "../../utils/storage";

import CustomSlider from "../../components/CustomSlider";

import {
  commonLayoutStyle,
  profileScreenStyle,
} from "../../styles/globalStyles";
import Header from "../../components/Header";
import { getPatientData } from "../../apis/patientApi";

export default function PatientMyPageScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const fromFindPatient = route?.params?.fromFindPatient ?? false;
  const name = route?.params?.name;

  const [patientData, setPatientData] = useState(null);
  const [userName, setUserName] = useState("");

  const fetchUserName = async () => {
    try {
      const getName = await getUserName();
      setUserName(getName || false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (fromFindPatient) {
      setPatientData({ name: name, age: 72, gender: "남자" });
      fetchUserName();
      // setPatientData({ username: "김순자 어르신", age: 72, gender: "남자" }); //api안되면
    } else {
      fetchUserName();
    }
  }, []);

  // useEffect(() => {
  //   if (!fromFindPatient) {
  //     fetchUserName();
  //   }
  // }, []);

  useEffect(() => {
    if (!fromFindPatient && userName) {
      const fetchCaregiverData = async () => {
        try {
          const basicData = await getPatientData(userName);

          setPatientData(basicData);
        } catch (e) {
          console.log(e);
        }
      };
      fetchCaregiverData();
    }
  }, [userName]);

  const profileInfo = [
    { label: "병명", value: "선망증세" },
    { label: "키/몸무게", value: "167cm | 57kg" },
    { label: "간병 필요도", value: "당장 필요해요" },
    { label: "정기 간병", value: "월 수 금 | 오전 8시 - 오후 7시" },
    { label: "하루 간병", value: "7월 8일 | 오전 8시 - 오전 11시" },
    { label: "증세 정도", value: "" }, // 슬라이더를 위해 value를 빈 값으로 설정
  ];

  const workInfo = [
    { label: "근무지", value: "서울 중구 퇴계로 3길 43" },
    { label: "고용 형태", value: "장기 근무" },
    {
      label: "일급",
      value: "200,000원",
      subInfo: [
        {
          label: "*일급 산정 방식",
          value: "기본 시급 * 11시간 + 추가금",
        },
        {
          label: "   - 기본 시급",
          value: "시간 당 15,000원",
          highlight: false,
        },
        {
          label: "   - 추가급",
          value: ["급함 (+5,000원)", "중증 병세 (+10,000원)"],
          highlight: true,
        },
      ],
    },
  ];

  const sections = [
    {
      title: "모집 내용",
      type: "info",
      data: profileInfo,
    },
    {
      title: "근무 조건",
      type: "workInfo",
      data: workInfo,
    },
  ];
  const navigateToEditPage = () => {
    navigation.navigate("PatientMyPageEdit");
  };
  const navigateToChatPage = () => {
    navigation.navigate("ChatScreen", { sender: userName, receiver: name });
  };

  return (
    <View style={commonLayoutStyle.container}>
      {fromFindPatient && <Header title="환자 프로필 페이지" />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={profileScreenStyle.profileSection}>
          <Image
            source={require("../../assets/images/patientProfileImage.png")}
            style={profileScreenStyle.profileImage}
          />
          <View style={profileScreenStyle.profileInfo}>
            <View style={profileScreenStyle.profileInfoTopSection}>
              <Text style={profileScreenStyle.name}>{patientData?.name}</Text>
              {/* <Text style={profileScreenStyle.name}>{userName}</Text> */}
            </View>

            <View style={profileScreenStyle.detailContainer}>
              <Text style={profileScreenStyle.details}>
                나이 : {patientData?.age}
                {/* 나이 : 72살 */}
              </Text>
              <Text style={profileScreenStyle.details}>
                성별 : {patientData?.gender}
                {/* 성별 : 남자 */}
              </Text>
              <Text style={profileScreenStyle.badge}>
                특징 : 식사 보조, 거동 보조
              </Text>
            </View>
          </View>
        </View>

        {/* Sections */}
        {sections.map((section, index) => (
          <View key={index} style={profileScreenStyle.section}>
            <Text style={profileScreenStyle.sectionTitle}>{section.title}</Text>
            <View style={profileScreenStyle.sectionInfo}>
              {section.type === "info"
                ? section.data.map((item, itemIndex) => (
                    <View key={itemIndex} style={profileScreenStyle.infoRow}>
                      <Text style={profileScreenStyle.label}>{item.label}</Text>
                      {item.label === "증세 정도" ? (
                        <View style={{ flex: 1.5, marginLeft: 10 }}>
                          <CustomSlider
                            width={180}
                            disabled={true}
                            initialValue={0.5} //실제로는 환자 중증 정도 데이터 받아와서 넣어줘야함
                          />
                        </View>
                      ) : (
                        <Text style={profileScreenStyle.infoData}>
                          {item.value}
                        </Text>
                      )}
                    </View>
                  ))
                : section.type === "workInfo"
                ? section.data.map((item, itemIndex) => (
                    <View key={itemIndex}>
                      <View key={itemIndex} style={profileScreenStyle.infoRow}>
                        <Text style={profileScreenStyle.label}>
                          {item.label}
                        </Text>
                        <Text style={profileScreenStyle.infoData}>
                          {item.value}
                        </Text>
                      </View>
                      {/* 추가 정보가 존재하는 경우 */}
                      {item.subInfo && (
                        <View style={profileScreenStyle.subInfoContainer}>
                          {item.subInfo.map((subItem, subIndex) => (
                            <View
                              key={subIndex}
                              style={profileScreenStyle.subInfoRow}
                            >
                              <Text
                                style={[
                                  profileScreenStyle.subInfoLabel,
                                  subItem.highlight &&
                                    profileScreenStyle.highlightedText,
                                ]}
                              >
                                {subItem.label}
                              </Text>
                              {Array.isArray(subItem.value) ? (
                                <View
                                  style={profileScreenStyle.arrayValueContainer}
                                >
                                  {subItem.value.map((value, valueIndex) => (
                                    <Text
                                      key={valueIndex}
                                      style={[
                                        profileScreenStyle.subInfoValue,
                                        subItem.highlight &&
                                          profileScreenStyle.highlightedText,
                                      ]}
                                    >
                                      {value}
                                    </Text>
                                  ))}
                                </View>
                              ) : (
                                <Text
                                  style={[
                                    profileScreenStyle.subInfoValue,
                                    subItem.highlight &&
                                      profileScreenStyle.highlightedText,
                                  ]}
                                >
                                  {subItem.value}
                                </Text>
                              )}
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))
                : null}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      {!fromFindPatient ? (
        <TouchableOpacity
          style={profileScreenStyle.bottomButton}
          onPress={() => navigateToEditPage()}
        >
          <Text style={profileScreenStyle.bottomButtonText}>
            나의 정보 수정하기
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={profileScreenStyle.bottomButton}
          onPress={() => navigateToChatPage()}
        >
          <Text style={profileScreenStyle.bottomButtonText}>
            {patientData?.name}님에게 쪽지 보내기
            {/* {name}님에게 쪽지 보내기 */}
            {/* name //api안되면 */}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
