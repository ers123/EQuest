import { Story } from '@/types';

// More Aesop's Fables - Grade 4-5 Level
export const MORE_AESOP_STORIES: Story[] = [
  {
    id: 'aesop-ant-grasshopper',
    title: 'The Ant and the Grasshopper',
    titleKorean: '개미와 베짱이',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A hardworking ant and a lazy grasshopper learn about preparing for the future.',
    descriptionKorean: '부지런한 개미와 게으른 베짱이가 미래를 준비하는 것에 대해 배워요.',
    estimatedMinutes: 5,
    totalWords: 160,
    chapters: [
      {
        id: 'ch1',
        title: 'Summer Days',
        titleKorean: '여름날',
        content: `It was a [[beautiful]] [[summer]] day. The sun was [[shining]] brightly.

A [[hardworking]] Ant was [[carrying]] food to his home. He worked all day, every day, [[collecting]] seeds and grain.

A [[Grasshopper]] sat nearby, [[playing]] music and [[singing]] songs.

"Why do you work so [[hard]]?" asked the Grasshopper. "Come and [[play]] with me!"

"I am [[storing]] food for [[winter]]," said the Ant. "You should do the same."`,
        contentKorean: `아름다운 여름날이었어요. 태양이 밝게 빛나고 있었어요.

부지런한 개미가 집으로 음식을 나르고 있었어요. 그는 매일 종일 씨앗과 곡식을 모으며 일했어요.

베짱이가 근처에 앉아서 음악을 연주하고 노래를 부르고 있었어요.

"왜 그렇게 열심히 일해?" 베짱이가 물었어요. "나와 놀자!"

"나는 겨울을 위해 음식을 저장하고 있어," 개미가 말했어요. "너도 그래야 해."`,
        vocabulary: [
          { word: 'summer', pronunciation: '/ˈsʌmər/', meaning: '여름', example: 'I love summer vacation.', exampleKorean: '나는 여름 방학을 좋아해요.', level: 2, topic: 'weather' },
          { word: 'shining', pronunciation: '/ˈʃaɪnɪŋ/', meaning: '빛나는', example: 'The stars are shining.', exampleKorean: '별들이 빛나고 있어요.', level: 2, topic: 'nature' },
          { word: 'hardworking', pronunciation: '/ˈhɑːrdwɜːrkɪŋ/', meaning: '부지런한', example: 'She is a hardworking student.', exampleKorean: '그녀는 부지런한 학생이에요.', level: 2, topic: 'emotions' },
          { word: 'carrying', pronunciation: '/ˈkæriɪŋ/', meaning: '나르는', example: 'He is carrying a heavy bag.', exampleKorean: '그는 무거운 가방을 나르고 있어요.', level: 2, topic: 'actions' },
          { word: 'collecting', pronunciation: '/kəˈlektɪŋ/', meaning: '모으는', example: 'I am collecting stamps.', exampleKorean: '나는 우표를 모으고 있어요.', level: 2, topic: 'actions' },
          { word: 'grasshopper', pronunciation: '/ˈɡræshɑːpər/', meaning: '베짱이', example: 'The grasshopper can jump high.', exampleKorean: '베짱이는 높이 뛸 수 있어요.', level: 2, topic: 'animals' },
          { word: 'playing', pronunciation: '/ˈpleɪɪŋ/', meaning: '노는', example: 'The children are playing.', exampleKorean: '아이들이 놀고 있어요.', level: 2, topic: 'actions' },
          { word: 'singing', pronunciation: '/ˈsɪŋɪŋ/', meaning: '노래하는', example: 'She loves singing.', exampleKorean: '그녀는 노래하는 것을 좋아해요.', level: 2, topic: 'actions' },
          { word: 'storing', pronunciation: '/ˈstɔːrɪŋ/', meaning: '저장하는', example: 'We are storing food.', exampleKorean: '우리는 음식을 저장하고 있어요.', level: 2, topic: 'actions' },
          { word: 'winter', pronunciation: '/ˈwɪntər/', meaning: '겨울', example: 'Winter is cold.', exampleKorean: '겨울은 추워요.', level: 2, topic: 'weather' },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What was the Ant doing?',
            questionKorean: '개미는 무엇을 하고 있었나요?',
            options: ['Playing music', 'Collecting food', 'Sleeping', 'Swimming'],
            correctAnswer: 1,
            explanation: 'The Ant was collecting food for winter.',
            explanationKorean: '개미는 겨울을 위해 음식을 모으고 있었어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'What did the Grasshopper do all day?',
            questionKorean: '베짱이는 하루 종일 무엇을 했나요?',
            options: ['Worked hard', 'Played and sang', 'Slept', 'Ate food'],
            correctAnswer: 1,
            explanation: 'The Grasshopper played music and sang songs.',
            explanationKorean: '베짱이는 음악을 연주하고 노래를 불렀어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Winter Comes',
        titleKorean: '겨울이 오다',
        content: `The Grasshopper [[laughed]]. "Winter is far away! There is [[plenty]] of food [[everywhere]]. Why [[worry]]?"

Summer [[ended]]. [[Autumn]] came and went. Then [[winter]] [[arrived]].

The ground was [[covered]] with [[snow]]. It was very [[cold]]. There was no food to be [[found]].

The Grasshopper was [[hungry]] and [[freezing]]. He had no food and no [[shelter]].

"What will I do?" cried the Grasshopper.`,
        contentKorean: `베짱이가 웃었어요. "겨울은 멀었어! 어디에나 음식이 많아. 왜 걱정해?"

여름이 끝났어요. 가을이 왔다가 갔어요. 그리고 겨울이 도착했어요.

땅은 눈으로 덮여 있었어요. 매우 추웠어요. 찾을 수 있는 음식이 없었어요.

베짱이는 배고프고 얼어붙고 있었어요. 음식도 없고 피난처도 없었어요.

"어떻게 하지?" 베짱이가 울었어요.`,
        vocabulary: [
          { word: 'laughed', pronunciation: '/læft/', meaning: '웃었다', example: 'Everyone laughed at the joke.', exampleKorean: '모두가 농담에 웃었어요.', level: 2, topic: 'emotions' },
          { word: 'plenty', pronunciation: '/ˈplenti/', meaning: '많은', example: 'There is plenty of time.', exampleKorean: '시간이 많아요.', level: 2, topic: 'numbers' },
          { word: 'everywhere', pronunciation: '/ˈevriweər/', meaning: '어디에나', example: 'Flowers are everywhere.', exampleKorean: '꽃이 어디에나 있어요.', level: 2, topic: 'places' },
          { word: 'ended', pronunciation: '/ˈendɪd/', meaning: '끝났다', example: 'The movie ended.', exampleKorean: '영화가 끝났어요.', level: 2, topic: 'time' },
          { word: 'autumn', pronunciation: '/ˈɔːtəm/', meaning: '가을', example: 'Leaves fall in autumn.', exampleKorean: '가을에 나뭇잎이 떨어져요.', level: 2, topic: 'weather' },
          { word: 'arrived', pronunciation: '/əˈraɪvd/', meaning: '도착했다', example: 'The train arrived.', exampleKorean: '기차가 도착했어요.', level: 2, topic: 'travel' },
          { word: 'covered', pronunciation: '/ˈkʌvərd/', meaning: '덮인', example: 'The cake is covered with cream.', exampleKorean: '케이크가 크림으로 덮여 있어요.', level: 2, topic: 'actions' },
          { word: 'snow', pronunciation: '/snoʊ/', meaning: '눈', example: 'Snow is white.', exampleKorean: '눈은 하얘요.', level: 2, topic: 'weather' },
          { word: 'freezing', pronunciation: '/ˈfriːzɪŋ/', meaning: '얼어붙는', example: 'It is freezing cold.', exampleKorean: '얼어붙을 정도로 추워요.', level: 2, topic: 'weather' },
          { word: 'shelter', pronunciation: '/ˈʃeltər/', meaning: '피난처', example: 'We found shelter from the rain.', exampleKorean: '우리는 비를 피할 곳을 찾았어요.', level: 3, topic: 'places' },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'What happened when winter came?',
            questionKorean: '겨울이 왔을 때 무슨 일이 일어났나요?',
            options: ['The Grasshopper found lots of food', 'There was no food to find', 'The Ant gave all his food away', 'It was very warm'],
            correctAnswer: 1,
            explanation: 'There was no food to be found in winter.',
            explanationKorean: '겨울에는 찾을 수 있는 음식이 없었어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'How did the Grasshopper feel in winter?',
            questionKorean: '베짱이는 겨울에 어떻게 느꼈나요?',
            options: ['Happy and warm', 'Hungry and cold', 'Excited', 'Proud'],
            correctAnswer: 1,
            explanation: 'The Grasshopper was hungry and freezing.',
            explanationKorean: '베짱이는 배고프고 얼어붙고 있었어요.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Lesson',
        titleKorean: '교훈',
        content: `The Grasshopper went to the Ant's house and [[knocked]] on the door.

"Please, Ant! Can you give me some food? I am so [[hungry]]!"

The Ant [[opened]] the door. His house was [[warm]] and full of food.

"What did you do all [[summer]]?" asked the Ant.

"I was singing and playing," said the Grasshopper [[sadly]].

"Then [[dance]] through winter," said the Ant. But then he [[smiled]] and [[shared]] some food. "[[Next]] time, [[prepare]] for the [[future]]."

**Moral of the story:** It is best to [[prepare]] for hard times.`,
        contentKorean: `베짱이는 개미의 집으로 가서 문을 두드렸어요.

"제발, 개미야! 음식 좀 줄 수 있어? 너무 배고파!"

개미가 문을 열었어요. 그의 집은 따뜻하고 음식으로 가득했어요.

"여름 동안 뭘 했어?" 개미가 물었어요.

"노래하고 놀았어," 베짱이가 슬프게 말했어요.

"그러면 겨울 내내 춤을 춰," 개미가 말했어요. 하지만 그는 미소 짓고 음식을 나눠줬어요. "다음에는 미래를 준비해."

**이야기의 교훈:** 어려운 시간을 대비하는 것이 가장 좋아요.`,
        vocabulary: [
          { word: 'knocked', pronunciation: '/nɑːkt/', meaning: '두드렸다', example: 'Someone knocked on the door.', exampleKorean: '누군가 문을 두드렸어요.', level: 2, topic: 'actions' },
          { word: 'opened', pronunciation: '/ˈoʊpənd/', meaning: '열었다', example: 'She opened the window.', exampleKorean: '그녀가 창문을 열었어요.', level: 2, topic: 'actions' },
          { word: 'warm', pronunciation: '/wɔːrm/', meaning: '따뜻한', example: 'The soup is warm.', exampleKorean: '수프가 따뜻해요.', level: 2, topic: 'weather' },
          { word: 'sadly', pronunciation: '/ˈsædli/', meaning: '슬프게', example: 'He looked at me sadly.', exampleKorean: '그가 나를 슬프게 바라봤어요.', level: 2, topic: 'emotions' },
          { word: 'dance', pronunciation: '/dæns/', meaning: '춤추다', example: 'I like to dance.', exampleKorean: '나는 춤추는 것을 좋아해요.', level: 2, topic: 'actions' },
          { word: 'smiled', pronunciation: '/smaɪld/', meaning: '미소 지었다', example: 'She smiled at me.', exampleKorean: '그녀가 나에게 미소 지었어요.', level: 2, topic: 'emotions' },
          { word: 'shared', pronunciation: '/ʃerd/', meaning: '나눴다', example: 'We shared the pizza.', exampleKorean: '우리는 피자를 나눴어요.', level: 2, topic: 'actions' },
          { word: 'next', pronunciation: '/nekst/', meaning: '다음', example: 'See you next time.', exampleKorean: '다음에 봐요.', level: 2, topic: 'time' },
          { word: 'prepare', pronunciation: '/prɪˈper/', meaning: '준비하다', example: 'Prepare for the test.', exampleKorean: '시험을 준비하세요.', level: 2, topic: 'actions' },
          { word: 'future', pronunciation: '/ˈfjuːtʃər/', meaning: '미래', example: 'What will the future bring?', exampleKorean: '미래에는 무엇이 올까요?', level: 3, topic: 'time' },
        ],
        quiz: [
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'What did the Ant do when the Grasshopper asked for food?',
            questionKorean: '베짱이가 음식을 요청했을 때 개미는 무엇을 했나요?',
            options: ['Closed the door', 'Shared some food', 'Ran away', 'Called for help'],
            correctAnswer: 1,
            explanation: 'The Ant smiled and shared some food.',
            explanationKorean: '개미는 미소 짓고 음식을 나눠줬어요.',
          },
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'What is the moral of this story?',
            questionKorean: '이 이야기의 교훈은 무엇인가요?',
            options: ['Play all summer', 'Never help others', 'Prepare for hard times', 'Sing every day'],
            correctAnswer: 2,
            explanation: 'It is best to prepare for hard times.',
            explanationKorean: '어려운 시간을 대비하는 것이 가장 좋아요.',
          },
        ],
      },
    ],
  },
  {
    id: 'aesop-boy-wolf',
    title: 'The Boy Who Cried Wolf',
    titleKorean: '늑대를 외친 소년',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A shepherd boy learns the importance of telling the truth.',
    descriptionKorean: '양치기 소년이 진실을 말하는 것의 중요성을 배워요.',
    estimatedMinutes: 5,
    totalWords: 150,
    chapters: [
      {
        id: 'ch1',
        title: 'The Bored Shepherd',
        titleKorean: '지루한 양치기',
        content: `There was once a [[shepherd]] boy who [[watched]] over [[sheep]] near a [[village]].

The boy was often [[bored]]. Watching sheep was not [[exciting]].

One day, he had an [[idea]]. "I will have some [[fun]]!" he thought.

He ran toward the village and [[shouted]] loudly: "Wolf! Wolf! A wolf is [[attacking]] the sheep!"

The [[villagers]] [[dropped]] their work and ran to help.`,
        contentKorean: `옛날에 마을 근처에서 양을 돌보는 양치기 소년이 있었어요.

소년은 자주 지루했어요. 양을 보는 것은 신나는 일이 아니었어요.

어느 날, 그는 아이디어가 떠올랐어요. "재미있게 놀아야지!" 그가 생각했어요.

그는 마을을 향해 달려가며 크게 외쳤어요: "늑대! 늑대! 늑대가 양을 공격하고 있어요!"

마을 사람들은 하던 일을 멈추고 도우러 달려왔어요.`,
        vocabulary: [
          { word: 'shepherd', pronunciation: '/ˈʃepərd/', meaning: '양치기', example: 'The shepherd watches the sheep.', exampleKorean: '양치기가 양을 돌봐요.', level: 2, topic: 'family' },
          { word: 'watched', pronunciation: '/wɑːtʃt/', meaning: '지켜봤다', example: 'I watched a movie.', exampleKorean: '나는 영화를 봤어요.', level: 2, topic: 'actions' },
          { word: 'sheep', pronunciation: '/ʃiːp/', meaning: '양', example: 'Sheep give us wool.', exampleKorean: '양은 우리에게 양모를 줘요.', level: 2, topic: 'animals' },
          { word: 'village', pronunciation: '/ˈvɪlɪdʒ/', meaning: '마을', example: 'I live in a small village.', exampleKorean: '나는 작은 마을에 살아요.', level: 2, topic: 'places' },
          { word: 'bored', pronunciation: '/bɔːrd/', meaning: '지루한', example: 'I am bored.', exampleKorean: '나는 지루해요.', level: 2, topic: 'emotions' },
          { word: 'exciting', pronunciation: '/ɪkˈsaɪtɪŋ/', meaning: '신나는', example: 'The game was exciting!', exampleKorean: '경기가 신났어요!', level: 2, topic: 'emotions' },
          { word: 'idea', pronunciation: '/aɪˈdiːə/', meaning: '아이디어', example: 'I have a good idea.', exampleKorean: '좋은 아이디어가 있어요.', level: 2, topic: 'school' },
          { word: 'shouted', pronunciation: '/ˈʃaʊtɪd/', meaning: '외쳤다', example: 'He shouted for help.', exampleKorean: '그가 도움을 외쳤어요.', level: 2, topic: 'actions' },
          { word: 'attacking', pronunciation: '/əˈtækɪŋ/', meaning: '공격하는', example: 'The lion is attacking.', exampleKorean: '사자가 공격하고 있어요.', level: 3, topic: 'actions' },
          { word: 'villagers', pronunciation: '/ˈvɪlɪdʒərz/', meaning: '마을 사람들', example: 'The villagers helped each other.', exampleKorean: '마을 사람들이 서로 도왔어요.', level: 2, topic: 'family' },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What was the boy\'s job?',
            questionKorean: '소년의 일은 무엇이었나요?',
            options: ['A farmer', 'A shepherd', 'A baker', 'A teacher'],
            correctAnswer: 1,
            explanation: 'The boy was a shepherd who watched sheep.',
            explanationKorean: '소년은 양을 돌보는 양치기였어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Why did the boy shout "Wolf"?',
            questionKorean: '왜 소년은 "늑대"라고 외쳤나요?',
            options: ['A real wolf came', 'He was bored and wanted fun', 'He was scared', 'He saw a dog'],
            correctAnswer: 1,
            explanation: 'He was bored and wanted to have fun.',
            explanationKorean: '그는 지루했고 재미있게 놀고 싶었어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The Trick',
        titleKorean: '속임수',
        content: `But when the villagers [[arrived]], there was no wolf. The sheep were [[safe]].

The boy [[laughed]] at the villagers. "Ha ha! I [[tricked]] you!"

The villagers were [[angry]], but they went back to work.

A few days [[later]], the boy did the same [[thing]]. "Wolf! Wolf!" he [[cried]].

[[Again]], the villagers came running. Again, there was no wolf.

"You [[foolish]] boy!" they said. "Do not [[lie]] to us!"`,
        contentKorean: `하지만 마을 사람들이 도착했을 때, 늑대는 없었어요. 양들은 안전했어요.

소년은 마을 사람들을 보고 웃었어요. "하하! 내가 속였어!"

마을 사람들은 화가 났지만, 다시 일하러 갔어요.

며칠 후, 소년은 같은 짓을 했어요. "늑대! 늑대!" 그가 외쳤어요.

또다시, 마을 사람들이 달려왔어요. 또다시, 늑대는 없었어요.

"이 어리석은 아이야!" 그들이 말했어요. "우리에게 거짓말하지 마!"`,
        vocabulary: [
          { word: 'arrived', pronunciation: '/əˈraɪvd/', meaning: '도착했다', example: 'We arrived on time.', exampleKorean: '우리는 제시간에 도착했어요.', level: 2, topic: 'travel' },
          { word: 'safe', pronunciation: '/seɪf/', meaning: '안전한', example: 'You are safe now.', exampleKorean: '이제 안전해요.', level: 2, topic: 'emotions' },
          { word: 'tricked', pronunciation: '/trɪkt/', meaning: '속였다', example: 'She tricked me!', exampleKorean: '그녀가 나를 속였어요!', level: 2, topic: 'actions' },
          { word: 'angry', pronunciation: '/ˈæŋɡri/', meaning: '화난', example: 'Mom was angry.', exampleKorean: '엄마가 화났어요.', level: 2, topic: 'emotions' },
          { word: 'later', pronunciation: '/ˈleɪtər/', meaning: '나중에', example: 'I\'ll do it later.', exampleKorean: '나중에 할게요.', level: 2, topic: 'time' },
          { word: 'thing', pronunciation: '/θɪŋ/', meaning: '일, 것', example: 'What is that thing?', exampleKorean: '저것은 무엇이에요?', level: 2, topic: 'school' },
          { word: 'cried', pronunciation: '/kraɪd/', meaning: '외쳤다', example: 'She cried for help.', exampleKorean: '그녀가 도움을 외쳤어요.', level: 2, topic: 'actions' },
          { word: 'again', pronunciation: '/əˈɡen/', meaning: '또, 다시', example: 'Say it again.', exampleKorean: '다시 말해요.', level: 2, topic: 'time' },
          { word: 'foolish', pronunciation: '/ˈfuːlɪʃ/', meaning: '어리석은', example: 'That was a foolish mistake.', exampleKorean: '그것은 어리석은 실수였어요.', level: 3, topic: 'emotions' },
          { word: 'lie', pronunciation: '/laɪ/', meaning: '거짓말하다', example: 'Don\'t lie to me.', exampleKorean: '나에게 거짓말하지 마.', level: 2, topic: 'actions' },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'How many times did the boy lie?',
            questionKorean: '소년은 몇 번 거짓말했나요?',
            options: ['Once', 'Twice', 'Three times', 'Never'],
            correctAnswer: 1,
            explanation: 'The boy lied twice before the real wolf came.',
            explanationKorean: '소년은 진짜 늑대가 오기 전에 두 번 거짓말했어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'How did the villagers feel after being tricked?',
            questionKorean: '속은 후 마을 사람들은 어떻게 느꼈나요?',
            options: ['Happy', 'Angry', 'Sleepy', 'Hungry'],
            correctAnswer: 1,
            explanation: 'The villagers were angry.',
            explanationKorean: '마을 사람들은 화가 났어요.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Real Wolf',
        titleKorean: '진짜 늑대',
        content: `One day, a [[real]] wolf [[appeared]]. It started to attack the sheep!

The boy was [[terrified]]. "Wolf! Wolf! Please help!" he screamed.

But the villagers did not [[believe]] him. "He is lying [[again]]," they said.

[[Nobody]] came to help. The wolf [[took]] many sheep away.

The boy [[learned]] a very [[important]] [[lesson]] that day.

**Moral of the story:** [[Nobody]] [[believes]] a [[liar]], even when they tell the [[truth]].`,
        contentKorean: `어느 날, 진짜 늑대가 나타났어요. 양들을 공격하기 시작했어요!

소년은 무서웠어요. "늑대! 늑대! 제발 도와줘요!" 그가 소리쳤어요.

하지만 마을 사람들은 그를 믿지 않았어요. "또 거짓말하는 거야," 그들이 말했어요.

아무도 도우러 오지 않았어요. 늑대는 많은 양을 데려갔어요.

소년은 그날 매우 중요한 교훈을 배웠어요.

**이야기의 교훈:** 거짓말쟁이의 말은 진실을 말해도 아무도 믿지 않아요.`,
        vocabulary: [
          { word: 'real', pronunciation: '/riːl/', meaning: '진짜의', example: 'Is this real gold?', exampleKorean: '이것은 진짜 금이에요?', level: 2, topic: 'nature' },
          { word: 'appeared', pronunciation: '/əˈpɪrd/', meaning: '나타났다', example: 'A rainbow appeared.', exampleKorean: '무지개가 나타났어요.', level: 2, topic: 'actions' },
          { word: 'terrified', pronunciation: '/ˈterɪfaɪd/', meaning: '겁에 질린', example: 'I was terrified.', exampleKorean: '나는 겁에 질렸어요.', level: 3, topic: 'emotions' },
          { word: 'believe', pronunciation: '/bɪˈliːv/', meaning: '믿다', example: 'I believe you.', exampleKorean: '나는 너를 믿어.', level: 2, topic: 'emotions' },
          { word: 'nobody', pronunciation: '/ˈnoʊbɑːdi/', meaning: '아무도 ~않다', example: 'Nobody knows.', exampleKorean: '아무도 몰라요.', level: 2, topic: 'family' },
          { word: 'took', pronunciation: '/tʊk/', meaning: '데려갔다', example: 'He took my book.', exampleKorean: '그가 내 책을 가져갔어요.', level: 2, topic: 'actions' },
          { word: 'learned', pronunciation: '/lɜːrnd/', meaning: '배웠다', example: 'I learned a lot today.', exampleKorean: '오늘 많이 배웠어요.', level: 2, topic: 'school' },
          { word: 'important', pronunciation: '/ɪmˈpɔːrtnt/', meaning: '중요한', example: 'This is important.', exampleKorean: '이것은 중요해요.', level: 2, topic: 'school' },
          { word: 'lesson', pronunciation: '/ˈlesn/', meaning: '교훈, 수업', example: 'I learned my lesson.', exampleKorean: '교훈을 배웠어요.', level: 2, topic: 'school' },
          { word: 'liar', pronunciation: '/ˈlaɪər/', meaning: '거짓말쟁이', example: 'Don\'t be a liar.', exampleKorean: '거짓말쟁이가 되지 마.', level: 3, topic: 'emotions' },
        ],
        quiz: [
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Why didn\'t the villagers come when the real wolf appeared?',
            questionKorean: '진짜 늑대가 나타났을 때 왜 마을 사람들은 오지 않았나요?',
            options: ['They were sleeping', 'They didn\'t believe the boy', 'They were scared', 'They didn\'t hear him'],
            correctAnswer: 1,
            explanation: 'They didn\'t believe him because he had lied before.',
            explanationKorean: '소년이 전에 거짓말을 했기 때문에 그를 믿지 않았어요.',
          },
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'What is the moral of this story?',
            questionKorean: '이 이야기의 교훈은 무엇인가요?',
            options: ['Wolves are dangerous', 'Sheep need protection', 'Nobody believes a liar', 'Villages are fun'],
            correctAnswer: 2,
            explanation: 'Nobody believes a liar, even when they tell the truth.',
            explanationKorean: '거짓말쟁이의 말은 진실을 말해도 아무도 믿지 않아요.',
          },
        ],
      },
    ],
  },
  {
    id: 'aesop-crow-pitcher',
    title: 'The Crow and the Pitcher',
    titleKorean: '까마귀와 물병',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A clever crow finds a way to drink water from a pitcher.',
    descriptionKorean: '영리한 까마귀가 물병에서 물을 마시는 방법을 찾아요.',
    estimatedMinutes: 4,
    totalWords: 120,
    chapters: [
      {
        id: 'ch1',
        title: 'The Thirsty Crow',
        titleKorean: '목마른 까마귀',
        content: `It was a very [[hot]] day. A [[Crow]] was flying over the [[land]], looking for [[water]].

The Crow was very [[thirsty]]. He had been flying for [[hours]].

[[Finally]], he saw a [[pitcher]] on the [[ground]]. There was water [[inside]]!

The Crow was so [[happy]]. He [[flew]] down to the pitcher.

But when he tried to [[drink]], he could not [[reach]] the water. The water was too [[low]] in the pitcher.`,
        contentKorean: `매우 더운 날이었어요. 까마귀가 물을 찾으며 땅 위를 날고 있었어요.

까마귀는 매우 목말랐어요. 몇 시간 동안 날아다녔어요.

마침내, 그는 땅에 물병이 있는 것을 봤어요. 안에 물이 있었어요!

까마귀는 너무 행복했어요. 그는 물병으로 날아 내려갔어요.

하지만 물을 마시려고 했을 때, 물에 닿을 수 없었어요. 물이 물병 안에서 너무 낮은 곳에 있었어요.`,
        vocabulary: [
          { word: 'crow', pronunciation: '/kroʊ/', meaning: '까마귀', example: 'The crow is black.', exampleKorean: '까마귀는 검은색이에요.', level: 2, topic: 'animals' },
          { word: 'land', pronunciation: '/lænd/', meaning: '땅', example: 'Birds fly over the land.', exampleKorean: '새들이 땅 위를 날아요.', level: 2, topic: 'nature' },
          { word: 'water', pronunciation: '/ˈwɔːtər/', meaning: '물', example: 'I drink water every day.', exampleKorean: '나는 매일 물을 마셔요.', level: 2, topic: 'food' },
          { word: 'thirsty', pronunciation: '/ˈθɜːrsti/', meaning: '목마른', example: 'I am thirsty.', exampleKorean: '나는 목말라요.', level: 2, topic: 'emotions' },
          { word: 'hours', pronunciation: '/ˈaʊərz/', meaning: '시간들', example: 'It took hours to finish.', exampleKorean: '끝내는 데 몇 시간이 걸렸어요.', level: 2, topic: 'time' },
          { word: 'pitcher', pronunciation: '/ˈpɪtʃər/', meaning: '물병, 주전자', example: 'Fill the pitcher with juice.', exampleKorean: '주전자에 주스를 채워요.', level: 2, topic: 'food' },
          { word: 'ground', pronunciation: '/ɡraʊnd/', meaning: '땅', example: 'Sit on the ground.', exampleKorean: '땅에 앉아요.', level: 2, topic: 'nature' },
          { word: 'inside', pronunciation: '/ɪnˈsaɪd/', meaning: '안에', example: 'Come inside.', exampleKorean: '안으로 들어와요.', level: 2, topic: 'places' },
          { word: 'flew', pronunciation: '/fluː/', meaning: '날았다', example: 'The bird flew away.', exampleKorean: '새가 날아갔어요.', level: 2, topic: 'actions' },
          { word: 'low', pronunciation: '/loʊ/', meaning: '낮은', example: 'The table is low.', exampleKorean: '탁자가 낮아요.', level: 2, topic: 'nature' },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What was the Crow looking for?',
            questionKorean: '까마귀는 무엇을 찾고 있었나요?',
            options: ['Food', 'Water', 'A friend', 'A home'],
            correctAnswer: 1,
            explanation: 'The Crow was looking for water because he was thirsty.',
            explanationKorean: '까마귀는 목말랐기 때문에 물을 찾고 있었어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Why couldn\'t the Crow drink the water?',
            questionKorean: '왜 까마귀는 물을 마실 수 없었나요?',
            options: ['The water was too hot', 'The water was too low', 'The pitcher was broken', 'There was no water'],
            correctAnswer: 1,
            explanation: 'The water was too low in the pitcher.',
            explanationKorean: '물이 물병 안에서 너무 낮은 곳에 있었어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The Clever Idea',
        titleKorean: '영리한 아이디어',
        content: `The Crow [[thought]] and thought. He would not give up!

Then he had a [[clever]] [[idea]]. He saw some [[pebbles]] on the ground.

He [[picked]] up a pebble with his [[beak]] and [[dropped]] it into the pitcher.

The water [[rose]] a little bit.

He dropped [[another]] pebble. The water rose some [[more]].

The Crow kept dropping pebbles, one by one. [[Slowly]], the water rose [[higher]] and higher.

[[Finally]], the water was high [[enough]]! The Crow could drink!

**Moral of the story:** Where there's a [[will]], there's a way.`,
        contentKorean: `까마귀는 생각하고 또 생각했어요. 그는 포기하지 않을 거예요!

그때 영리한 아이디어가 떠올랐어요. 땅에 조약돌들이 있는 것을 봤어요.

그는 부리로 조약돌을 집어서 물병에 떨어뜨렸어요.

물이 조금 올라갔어요.

그는 또 다른 조약돌을 떨어뜨렸어요. 물이 조금 더 올라갔어요.

까마귀는 계속해서 조약돌을 하나씩 떨어뜨렸어요. 천천히, 물이 점점 더 높이 올라갔어요.

마침내, 물이 충분히 높아졌어요! 까마귀는 물을 마실 수 있었어요!

**이야기의 교훈:** 의지가 있는 곳에 길이 있어요.`,
        vocabulary: [
          { word: 'thought', pronunciation: '/θɔːt/', meaning: '생각했다', example: 'I thought about it.', exampleKorean: '나는 그것에 대해 생각했어요.', level: 2, topic: 'actions' },
          { word: 'clever', pronunciation: '/ˈklevər/', meaning: '영리한', example: 'She is very clever.', exampleKorean: '그녀는 매우 영리해요.', level: 2, topic: 'emotions' },
          { word: 'pebbles', pronunciation: '/ˈpeblz/', meaning: '조약돌', example: 'I collected pebbles at the beach.', exampleKorean: '나는 해변에서 조약돌을 모았어요.', level: 2, topic: 'nature' },
          { word: 'picked', pronunciation: '/pɪkt/', meaning: '집었다', example: 'I picked a flower.', exampleKorean: '나는 꽃을 집었어요.', level: 2, topic: 'actions' },
          { word: 'beak', pronunciation: '/biːk/', meaning: '부리', example: 'Birds have beaks.', exampleKorean: '새들은 부리가 있어요.', level: 2, topic: 'animals' },
          { word: 'dropped', pronunciation: '/drɑːpt/', meaning: '떨어뜨렸다', example: 'I dropped my phone.', exampleKorean: '나는 핸드폰을 떨어뜨렸어요.', level: 2, topic: 'actions' },
          { word: 'rose', pronunciation: '/roʊz/', meaning: '올라갔다', example: 'The sun rose.', exampleKorean: '해가 떠올랐어요.', level: 2, topic: 'actions' },
          { word: 'slowly', pronunciation: '/ˈsloʊli/', meaning: '천천히', example: 'Walk slowly.', exampleKorean: '천천히 걸어요.', level: 2, topic: 'actions' },
          { word: 'higher', pronunciation: '/ˈhaɪər/', meaning: '더 높이', example: 'Jump higher!', exampleKorean: '더 높이 뛰어요!', level: 2, topic: 'actions' },
          { word: 'enough', pronunciation: '/ɪˈnʌf/', meaning: '충분한', example: 'That is enough.', exampleKorean: '그것은 충분해요.', level: 2, topic: 'numbers' },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'What did the Crow use to raise the water?',
            questionKorean: '까마귀는 물을 올리기 위해 무엇을 사용했나요?',
            options: ['Sticks', 'Pebbles', 'Leaves', 'Sand'],
            correctAnswer: 1,
            explanation: 'The Crow used pebbles to raise the water.',
            explanationKorean: '까마귀는 조약돌을 사용해서 물을 올렸어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'What is the moral of this story?',
            questionKorean: '이 이야기의 교훈은 무엇인가요?',
            options: ['Give up when things are hard', 'Crows are smart', 'Where there\'s a will, there\'s a way', 'Water is important'],
            correctAnswer: 2,
            explanation: 'Where there\'s a will, there\'s a way.',
            explanationKorean: '의지가 있는 곳에 길이 있어요.',
          },
        ],
      },
    ],
  },
  {
    id: 'aesop-dog-bone',
    title: 'The Dog and His Reflection',
    titleKorean: '개와 그림자',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A greedy dog learns about being content with what he has.',
    descriptionKorean: '욕심 많은 개가 자신이 가진 것에 만족하는 법을 배워요.',
    estimatedMinutes: 4,
    totalWords: 110,
    chapters: [
      {
        id: 'ch1',
        title: 'The Lucky Dog',
        titleKorean: '운 좋은 개',
        content: `One day, a Dog [[found]] a big, [[juicy]] [[bone]]. He was very [[happy]].

"This is the [[best]] bone I have ever found!" thought the Dog.

He [[decided]] to take it home to [[enjoy]] it.

On his way home, he had to [[cross]] a [[bridge]] over a [[river]].

As he walked across the bridge, he [[looked]] down into the water.`,
        contentKorean: `어느 날, 개가 크고 즙이 많은 뼈를 발견했어요. 그는 매우 행복했어요.

"이것은 내가 찾은 뼈 중 최고야!" 개가 생각했어요.

그는 그것을 집에 가져가서 즐기기로 결정했어요.

집으로 가는 길에, 그는 강 위에 있는 다리를 건너야 했어요.

다리를 건너면서, 그는 물 속을 내려다봤어요.`,
        vocabulary: [
          { word: 'found', pronunciation: '/faʊnd/', meaning: '발견했다', example: 'I found my keys.', exampleKorean: '나는 열쇠를 찾았어요.', level: 2, topic: 'actions' },
          { word: 'juicy', pronunciation: '/ˈdʒuːsi/', meaning: '즙이 많은', example: 'The orange is juicy.', exampleKorean: '오렌지는 즙이 많아요.', level: 2, topic: 'food' },
          { word: 'bone', pronunciation: '/boʊn/', meaning: '뼈', example: 'Dogs love bones.', exampleKorean: '개들은 뼈를 좋아해요.', level: 2, topic: 'body' },
          { word: 'best', pronunciation: '/best/', meaning: '최고의', example: 'You are the best!', exampleKorean: '너가 최고야!', level: 2, topic: 'emotions' },
          { word: 'decided', pronunciation: '/dɪˈsaɪdɪd/', meaning: '결정했다', example: 'I decided to go.', exampleKorean: '가기로 결정했어요.', level: 2, topic: 'actions' },
          { word: 'enjoy', pronunciation: '/ɪnˈdʒɔɪ/', meaning: '즐기다', example: 'Enjoy your meal!', exampleKorean: '식사를 즐기세요!', level: 2, topic: 'emotions' },
          { word: 'cross', pronunciation: '/krɔːs/', meaning: '건너다', example: 'Cross the street carefully.', exampleKorean: '길을 조심히 건너요.', level: 2, topic: 'actions' },
          { word: 'bridge', pronunciation: '/brɪdʒ/', meaning: '다리', example: 'Walk across the bridge.', exampleKorean: '다리를 건너요.', level: 2, topic: 'places' },
          { word: 'river', pronunciation: '/ˈrɪvər/', meaning: '강', example: 'Fish swim in the river.', exampleKorean: '물고기가 강에서 수영해요.', level: 2, topic: 'nature' },
          { word: 'looked', pronunciation: '/lʊkt/', meaning: '바라봤다', example: 'I looked at the sky.', exampleKorean: '나는 하늘을 바라봤어요.', level: 2, topic: 'actions' },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What did the Dog find?',
            questionKorean: '개는 무엇을 발견했나요?',
            options: ['A ball', 'A bone', 'A fish', 'A toy'],
            correctAnswer: 1,
            explanation: 'The Dog found a big, juicy bone.',
            explanationKorean: '개는 크고 즙이 많은 뼈를 발견했어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Where was the Dog going?',
            questionKorean: '개는 어디로 가고 있었나요?',
            options: ['To the park', 'To the river', 'To his home', 'To the forest'],
            correctAnswer: 2,
            explanation: 'The Dog was going home to enjoy his bone.',
            explanationKorean: '개는 뼈를 즐기기 위해 집으로 가고 있었어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The Greedy Dog',
        titleKorean: '욕심 많은 개',
        content: `In the water, he saw [[another]] dog with a bone! It was his [[reflection]], but he did not [[know]] that.

"That dog has a bone too!" thought the Dog. "And his bone looks [[bigger]] than mine!"

The [[greedy]] Dog [[wanted]] both bones. He [[opened]] his [[mouth]] to [[bark]] at the other dog.

But when he opened his mouth, his bone [[fell]] into the water! [[Splash]]!

The bone [[sank]] to the [[bottom]] of the river. Now the Dog had [[nothing]].

**Moral of the story:** Be [[happy]] with what you have, or you may [[lose]] it all.`,
        contentKorean: `물 속에서, 그는 뼈를 가진 또 다른 개를 봤어요! 그것은 그의 그림자였지만, 그는 그것을 몰랐어요.

"저 개도 뼈가 있어!" 개가 생각했어요. "그리고 그 뼈는 내 것보다 더 커 보여!"

욕심 많은 개는 두 뼈 모두 원했어요. 그는 다른 개에게 짖기 위해 입을 벌렸어요.

하지만 입을 벌렸을 때, 그의 뼈가 물에 떨어졌어요! 풍덩!

뼈는 강 바닥으로 가라앉았어요. 이제 개는 아무것도 없었어요.

**이야기의 교훈:** 가진 것에 행복하세요, 그렇지 않으면 모든 것을 잃을 수 있어요.`,
        vocabulary: [
          { word: 'another', pronunciation: '/əˈnʌðər/', meaning: '또 다른', example: 'Give me another one.', exampleKorean: '다른 것을 주세요.', level: 2, topic: 'numbers' },
          { word: 'reflection', pronunciation: '/rɪˈflekʃn/', meaning: '비친 모습', example: 'I saw my reflection in the mirror.', exampleKorean: '거울에서 내 모습을 봤어요.', level: 3, topic: 'nature' },
          { word: 'know', pronunciation: '/noʊ/', meaning: '알다', example: 'I know the answer.', exampleKorean: '나는 답을 알아요.', level: 2, topic: 'school' },
          { word: 'bigger', pronunciation: '/ˈbɪɡər/', meaning: '더 큰', example: 'My bag is bigger.', exampleKorean: '내 가방이 더 커요.', level: 2, topic: 'nature' },
          { word: 'greedy', pronunciation: '/ˈɡriːdi/', meaning: '욕심 많은', example: 'Don\'t be greedy.', exampleKorean: '욕심 부리지 마.', level: 3, topic: 'emotions' },
          { word: 'wanted', pronunciation: '/ˈwɑːntɪd/', meaning: '원했다', example: 'I wanted that toy.', exampleKorean: '나는 그 장난감을 원했어요.', level: 2, topic: 'emotions' },
          { word: 'bark', pronunciation: '/bɑːrk/', meaning: '짖다', example: 'Dogs bark loudly.', exampleKorean: '개들은 크게 짖어요.', level: 2, topic: 'animals' },
          { word: 'fell', pronunciation: '/fel/', meaning: '떨어졌다', example: 'The apple fell from the tree.', exampleKorean: '사과가 나무에서 떨어졌어요.', level: 2, topic: 'actions' },
          { word: 'sank', pronunciation: '/sæŋk/', meaning: '가라앉았다', example: 'The ship sank.', exampleKorean: '배가 가라앉았어요.', level: 2, topic: 'actions' },
          { word: 'nothing', pronunciation: '/ˈnʌθɪŋ/', meaning: '아무것도 없는', example: 'I have nothing.', exampleKorean: '나는 아무것도 없어요.', level: 2, topic: 'numbers' },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'What did the Dog see in the water?',
            questionKorean: '개는 물에서 무엇을 봤나요?',
            options: ['A fish', 'Another dog (his reflection)', 'A cat', 'A frog'],
            correctAnswer: 1,
            explanation: 'He saw his own reflection.',
            explanationKorean: '그는 자기 자신의 비친 모습을 봤어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'What happened to the Dog\'s bone?',
            questionKorean: '개의 뼈는 어떻게 되었나요?',
            options: ['He ate it', 'It fell in the river', 'Another dog took it', 'He took it home'],
            correctAnswer: 1,
            explanation: 'The bone fell into the river when he opened his mouth.',
            explanationKorean: '그가 입을 벌렸을 때 뼈가 강에 떨어졌어요.',
          },
        ],
      },
    ],
  },
];
