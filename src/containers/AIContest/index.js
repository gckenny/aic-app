import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@tonic-ui/react";
import { useToggle } from "@tonic-ui/react-hooks";
import { get, random } from "lodash";
import { useEffect, useState } from "react";

import RadarChart from "./components/RadarChart";
import SimplyTable from "./components/SimplyTable";
import Header from "../App/layout/Header";
import talentObj from "./talentObject.json";

const Item = (props) => {
  return <Box border={1} borderColor='gray:70' p='2x' {...props} />;
};

const AppAIContest = () => {
  const talentList = [
    "Problem Solving",
    "Proactiveness",
    "Self awareness & Self reflection",
    "Communication",
    "Learning Agility",
    "Innovation",
    "Collaboration",
    "Trust Worthiness",
    "Prioritization",
    "Aggressiveness",
    "Customer Insight",
    "Pressure Management",
    "Decision Making",
    "Working Motivation",
  ];

  // Fisher-Yates Shuffle 洗牌算法
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomTalentList = () => {
    // 先將 talentList 深拷貝一份
    const shuffledTalentList = [...talentList];
    // 對拷貝的 talentList 做洗牌
    const shuffledList = shuffleArray(shuffledTalentList);
    // 取出項目
    const randomEight = shuffledList.slice(0, 6);
    return randomEight;
  };

  const [talents, setTalents] = useState(getRandomTalentList());

  const reportData = {
    header: ["Competency", "Key Behaviors", "Score", "Feedback"],
    body: [
      ["Problem Solving", ["分析問題找出癥結", "尋找各種選擇與替代方案", "妥善運用解決問題的技巧"], [4, 2, 1], ""],
      ["Proactiveness", ["積極主動尋找解決問題的方法", "主動採取行動達成目標", "對挑戰積極主動處理"], [4, 3, 2], ""],
      [
        "Self-awareness & Self reflection",
        ["認識個人優勢和弱點", "了解自己的情緒和行為", "理解自己對他人的影響"],
        [3, 4, 3],
        "",
      ],
      ["Communication", ["主動積極溝通", "有效表達意見", "善於聆聽他人"], [4, 4, 4], ""],
      ["Learning Agility", ["積極學習新技術", "舉一反三", "透過觀察學習", "可快速應用新知識"], [4, 2, 3, 4], ""],
      ["Innovation", ["產生創意的想法和解決方案", "接納新方法和科技", "實施新方法改進流程"], [4, 3, 2], ""],
      ["Collaboration", ["團隊合作達成共同目標", "積極參與和貢獻", "建立和諧的工作關係"], [4, 3, 4], ""],
      ["Trustworthiness", ["值得信賴", "誠實可靠", "保守機密"], [4, 4, 4], ""],
      ["Prioritization", ["優先處理任務", "合理分配時間資源", "有效控制進度"], [3, 4, 3], ""],
      ["Aggressiveness", ["積極追求目標", "展現成功的決心", "大膽行動達成目標"], [3, 4, 3], ""],
      ["Customer Insight", ["了解客戶需求", "掌握市場趨勢", "以客戶為中心"], [4, 3, 4], ""],
      ["Pressure Management", ["積極面對壓力", "有效應對挑戰", "保持穩定表現"], [3, 4, 3], ""],
      ["Decision Making", ["做出明智和及時的決策", "考慮所有相關因素後做決定", "對決策結果負責"], [4, 4, 4], ""],
      ["Working Motivation", ["積極投入工作", "熱情積極", "持續保持工作動力"], [4, 4, 4], ""],
    ],
  };

  const grades = [
    "Junior",
    "Intermediate",
    "Senior",
    "Staff",
    "Senior Staff",
    "Principal Staff",
    "Senior Principal Staff",
    "Lead",
    "Senior Lead",
    "Principal Lead",
  ];
  const [gradeId, setGradeId] = useState(random(0, 9));
  const handleGradeChange = (newGrade) => {
    if (newGrade < 0 || newGrade > 9) return;
    const clampedGrade = Math.min(Math.max(newGrade, 0), 9);
    setGradeId(clampedGrade);
    setTalents(getRandomTalentList());
  };
  const handleExplorer = () => {
    setTalents(getRandomTalentList());
  };
  const [sceneId, setSceneId] = useState(0);
  const handleSceneChange = (newScene) => {
    setSceneId(1);
  };

  const [isOpen, toggleModal] = useToggle(false);

  const getQuestionData = (data) => {
    // 隨機取出三筆資料
    const randomItems = [];
    while (randomItems.length < 3) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomItems.includes(data[randomIndex])) {
        randomItems.push(data[randomIndex]);
      }
    }

    return randomItems;
  };

  return (
    <>
      <Header />
      <Flex direction='column' m='4x'>
        <Box>
          <Text size='xl'>Resume</Text>
          <Divider />
          <Box m='2x' mt='4x' mb='6x'>
            <Text>Candidate : Leonardo Pikachu</Text>
          </Box>
        </Box>
        {sceneId === 0 && (
          <Box>
            <Text size='xl'>Questions</Text>
            <Divider />
            <Text m='2x' fontWeight='semibold'>
              Grade : {grades[gradeId]}
            </Text>
            <Box m='2x' mt='6x'>
              <Flex columnGap='4x'>
                <Button
                  columnGap='2x'
                  onClick={() => {
                    handleGradeChange(gradeId + 1);
                  }}
                >
                  <Icon icon='arrow-up' />
                  Level Up
                </Button>
                <Button
                  columnGap='2x'
                  onClick={() => {
                    handleGradeChange(gradeId - 1);
                  }}
                >
                  <Icon icon='arrow-down' />
                  Level Down
                </Button>
                <Button
                  columnGap='2x'
                  onClick={() => {
                    handleExplorer();
                  }}
                >
                  <Icon icon='connection' />
                  Explore
                </Button>
                <Button
                  columnGap='2x'
                  onClick={() => {
                    toggleModal(true);
                    return;
                  }}
                >
                  <Icon icon='comment' />
                  Recording
                </Button>
                <Button
                  columnGap='2x'
                  onClick={() => {
                    handleSceneChange(1);
                  }}
                >
                  <Icon icon='box-out' />
                  End
                </Button>
              </Flex>
            </Box>
            <Box m='2x' mt='4x'>
              <Tabs>
                <TabList>
                  {talents.map((talent, id) => (
                    <Tab key={gradeId + "_" + id}>{talent}</Tab>
                  ))}
                </TabList>
                <TabPanels px='3x' py='2x'>
                  {talents.map((talent, id) => (
                    <TabPanel key={gradeId + "_" + id}>
                      <Stack direction='column' gap={"4x"} spacing='4x'>
                        {console.log(talent, "=>", talentObj[talent])}
                        {getQuestionData(talentObj[talent]).map((question, qid) => (
                          <Item key={qid}>Q: {question}</Item>
                        ))}
                      </Stack>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        )}
        {sceneId === 1 && (
          <Box>
            <Text size='xl'>Report</Text>
            <Divider />
            <Text m='2x' fontWeight='semibold'>
              Recommendation : Offer {grades[gradeId]}
            </Text>
            <Box m='2x' mt='6x'>
              <Flex direction='row'>
                <SimplyTable data={reportData} />
                <RadarChart talents={talents} />
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
      <Modal closeOnEsc closeOnOutsideClick isClosable isOpen={isOpen} onClose={() => toggleModal(false)} size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recording</ModalHeader>
          <ModalBody>
            <Box mb='4x'>The interviewee's voice input is instantly transcribed to text and displayed here...</Box>
            <Icon icon='headset-mic' size='20x' />
          </ModalBody>
          <ModalFooter justifyContent='space-between'>
            <Box></Box>
            <Box>
              <Button onClick={() => toggleModal(false)} minWidth='20x'>
                Recording End
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppAIContest;
