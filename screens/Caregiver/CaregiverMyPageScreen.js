import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  commonLayoutStyle,
  profileScreenStyle,
} from "../../styles/globalStyles";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Color } from "../../styles/color";
import { getUserName } from "../../utils/storage";

import useDrop from "../../node_modules/react-use/esm/useDrop";
import {
  getCaregiverData,
  getCaregiverMyProfile,
} from "../../apis/caregiverApi";

export default function CaregiverMyPageScreen() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [caregiverData, setCaregiverData] = useState(null);

  const fetchUserName = async () => {
    try {
      const getName = await getUserName();
      setUserName(getName || false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  useEffect(() => {
    if (userName) {
      const fetchCaregiverData = async () => {
        try {
          console.log("api 호출할 때의 유저 네임 : ", userName);
          const [basicData, profileData] = await Promise.all([
            getCaregiverData(userName),
            getCaregiverMyProfile(userName),
          ]);

          const combinedData = {
            ...basicData,
            ...profileData,
          };
          setCaregiverData(combinedData);
        } catch (e) {
          console.log(e);
        }
      };
      fetchCaregiverData();
    }
  }, [userName]);

  useEffect(() => {
    console.log("Got userName at CaregiverMyPageScreen:", userName);
    if (caregiverData) {
      console.log("Caregiver data:", caregiverData);
    }
  }, [userName, caregiverData]);

  const profileInfo = [
    { label: "활동 시간/요일", value: "월 수 금 | 오전 8시 - 오후 6시" },
    {
      label: "경력",
      value: [
        { career: "병원 간호사 2년", certified: true },
        { career: "요양원 간호사 1년", certified: false },
      ],
      isBadge: true,
    },
    { label: "진료 분야", value: "식사 보조, 거동 보조" },
  ];

  const sections = [
    {
      title: "모집 내용",
      type: "workInfo",
      data: profileInfo,
    },
    {
      title: "근무 조건",
      type: "info",
      data: [
        { label: "활동 지역", value: "부평" },
        { label: "희망 일급", value: "12,000원 이상" },
        { label: "희망 고용 형태", value: "장기 근무" },
      ],
    },
    {
      title: "후기",
      type: "review",
      data: [
        "요양사 선생님의 식사 보조 덕분에 어머니의 영양 상태가 많이 좋아졌습니다. 항상 친절하고 꼼꼼하게 돌봐주셔서 정말 감사합니다.",
        "할머니를 정성껏 돌봐주셔서 감사합니다. 특히 운동 보조를 해주신 덕분에 할머니의 근력이 조금씩 좋아지고 있어요. 앞으로도 잘 부탁드립니다.",
        "어르신들을 대하는 태도가 정말 훌륭하십니다. 항상 밝은 미소로 대해주시고, 꼼꼼하게 케어해주셔서 가족들도 안심하고 맡길 수 있었습니다.",
        " 항상 밝은 미소로 대해주시고, 꼼꼼하게 케어해주셔서 가족들도 안심하고 맡길 수 있었습니다.",
      ],
    },
  ];

  const handleEditButton = () => {
    navigation.navigate("CaregiverMyPageEdit");
  };

  if (caregiverData === null) {
    return (
      <View
        style={[
          commonLayoutStyle.container,
          {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={Color.pink900} />
      </View>
    );
  }
  return (
    <View style={commonLayoutStyle.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={profileScreenStyle.profileSection}>
          <Image
            source={require("../../assets/images/caregiverProfileImage.png")}
            style={profileScreenStyle.profileImage}
          />
          <View style={profileScreenStyle.profileInfo}>
            <View style={profileScreenStyle.profileInfoTopSection}>
              <View style={profileScreenStyle.certificateAlign}>
                <Text style={profileScreenStyle.name}>
                  {caregiverData.username}
                </Text>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={17}
                  color={Color.pink900}
                />
              </View>
              <Text style={profileScreenStyle.badge}>
                내 가족처럼 돌보는 요양사입니다.
              </Text>
            </View>

            <View style={profileScreenStyle.detailContainer}>
              <Text style={profileScreenStyle.details}>
                나이 : {caregiverData.name}
              </Text>
              <Text style={profileScreenStyle.details}>
                성별 : {caregiverData.gender}
              </Text>
            </View>
          </View>
          <View style={profileScreenStyle.ratingContainer}>
            <Ionicons name="heart" size={16} color={Color.pink900} />
            <Text style={profileScreenStyle.rating}>4.2</Text>
          </View>
        </View>

        {/* Sections */}
        {sections.map((section, index) => (
          <View key={index} style={profileScreenStyle.section}>
            {section.type === "review" ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={profileScreenStyle.sectionTitle}>
                  {section.title}
                </Text>
                <TouchableOpacity>
                  <Text style={profileScreenStyle.moreLink}>더보기 {">"}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={profileScreenStyle.sectionTitle}>
                {section.title}
              </Text>
            )}
            <View style={profileScreenStyle.sectionInfo}>
              {section.type === "workInfo" ? (
                section.data.map((item, itemIndex) => (
                  <View key={itemIndex} style={profileScreenStyle.infoRow}>
                    <Text style={profileScreenStyle.label}>{item.label}</Text>
                    {item.isBadge ? (
                      <View style={profileScreenStyle.badgeContainer}>
                        {Array.isArray(item.value) ? (
                          item.value.map((badge, badgeIndex) => (
                            <View
                              key={badgeIndex}
                              style={profileScreenStyle.badgeRow}
                            >
                              <Text style={profileScreenStyle.badgeInfoData}>
                                {badge.career}
                              </Text>
                              {badge.certified ? (
                                <AntDesign
                                  name="checksquare"
                                  size={18}
                                  color={Color.grin500}
                                />
                              ) : (
                                <Fontisto
                                  name="checkbox-passive"
                                  size={16.4}
                                  color={Color.grin500}
                                />
                              )}
                            </View>
                          ))
                        ) : (
                          <Text style={profileScreenStyle.badgeInfoData}>
                            {item.value}
                          </Text>
                        )}
                      </View>
                    ) : (
                      <Text style={profileScreenStyle.infoData}>
                        {item.value}
                      </Text>
                    )}
                  </View>
                ))
              ) : section.type === "info" ? (
                section.data.map((item, itemIndex) => (
                  <View key={itemIndex} style={profileScreenStyle.infoRow}>
                    <Text style={profileScreenStyle.label}>{item.label}</Text>
                    <Text style={profileScreenStyle.infoData}>
                      {item.value}
                    </Text>
                  </View>
                ))
              ) : section.type === "review" ? (
                <>
                  {section.data.slice(0, 3).map((review, reviewIndex) => (
                    <Text
                      key={reviewIndex}
                      style={profileScreenStyle.reviewText}
                      numberOfLines={1} //한줄 넘어가면 ellipsizeMode 처리
                      ellipsizeMode="tail" // ...으로 표시하도록 힘
                    >
                      {review}
                    </Text>
                  ))}
                </>
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity
        style={profileScreenStyle.bottomButton}
        onPress={() => handleEditButton()}
      >
        <Text style={profileScreenStyle.bottomButtonText}>
          나의 프로필 수정하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
