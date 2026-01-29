import { Story } from '@/types';
import { MORE_AESOP_STORIES } from './aesop-more';

// Aesop's Fables - Level 2 (Elementary - US 4th Grade level)
const AESOP_STORIES: Story[] = [
  {
    id: 'aesop-fox-grapes',
    title: 'The Fox and the Grapes',
    titleKorean: '여우와 포도',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A hungry fox tries to reach delicious grapes but learns an important lesson.',
    descriptionKorean: '배고픈 여우가 맛있는 포도를 먹으려고 하지만 중요한 교훈을 배워요.',
    estimatedMinutes: 15,
    totalWords: 650,
    chapters: [
      {
        id: 'ch1',
        title: 'The Hungry Fox',
        titleKorean: '배고픈 여우',
        content: `One [[hot]] summer day, a Fox was walking through a [[forest]]. The sun was shining brightly in the [[sky]], and the Fox was feeling very [[hungry]]. He had been walking for a long time, looking for something good to eat.

The Fox lived in a [[cozy]] den under a big oak tree. Usually, he was very good at finding food. He would catch mice in the [[meadow]], or find [[berries]] near the stream. But today, he had found nothing at all.

As he walked deeper into the forest, he came to a sunny [[clearing]]. In the middle of the clearing stood an old wooden [[fence]]. And growing along that fence was a [[beautiful]] [[grape]] vine!

The grapes were [[purple]] and looked very [[delicious]]. They hung in big bunches from the vine. The Fox could see drops of [[juice]] on the grapes, shining in the sunlight.

"Oh my!" said the Fox, his eyes growing wide with [[excitement]]. "Those grapes look so [[sweet]] and [[juicy]]! They are the most beautiful grapes I have ever seen! I must have them for my lunch."

The Fox licked his lips and walked closer to the vine. The [[smell]] of the grapes was wonderful. It made his stomach growl with hunger even more.`,
        contentKorean: `어느 더운 여름날, 여우 한 마리가 숲을 걷고 있었어요. 태양이 하늘에서 밝게 빛나고 있었고, 여우는 매우 배가 고팠어요. 그는 오랫동안 걸으며 먹을 것을 찾고 있었어요.

여우는 큰 참나무 아래의 아늑한 굴에서 살았어요. 보통 그는 음식을 찾는 것을 매우 잘했어요. 초원에서 생쥐를 잡거나 시냇가 근처에서 베리를 찾곤 했죠. 하지만 오늘은 아무것도 찾지 못했어요.

숲 깊은 곳으로 걸어가다가, 그는 햇볕이 드는 빈터에 도착했어요. 빈터 한가운데에 오래된 나무 울타리가 서 있었어요. 그리고 그 울타리를 따라 아름다운 포도 덩굴이 자라고 있었어요!

포도는 보라색이었고 매우 맛있어 보였어요. 큰 송이로 덩굴에 매달려 있었어요. 여우는 햇빛에 반짝이는 포도 즙 방울들을 볼 수 있었어요.

"오 이런!" 여우가 흥분으로 눈을 크게 뜨며 말했어요. "저 포도들은 정말 달콤하고 즙이 많아 보여! 내가 본 것 중 가장 아름다운 포도야! 점심으로 먹어야겠어."

여우는 입술을 핥으며 덩굴 가까이 다가갔어요. 포도 냄새가 정말 좋았어요. 그 냄새 때문에 배가 더 고파졌어요.`,
        vocabulary: [
          { word: 'hot', pronunciation: '/hɑːt/', meaning: '더운', example: 'It is a hot summer day.', exampleKorean: '더운 여름날이에요.', level: 2, topic: 'weather' },
          { word: 'forest', pronunciation: '/ˈfɔːrɪst/', meaning: '숲', example: 'The fox lives in the forest.', exampleKorean: '여우는 숲에 살아요.', level: 2, topic: 'nature' },
          { word: 'sky', pronunciation: '/skaɪ/', meaning: '하늘', example: 'The sky is blue today.', exampleKorean: '오늘 하늘이 파랗네요.', level: 2, topic: 'nature' },
          { word: 'hungry', pronunciation: '/ˈhʌŋɡri/', meaning: '배고픈', example: 'I am hungry.', exampleKorean: '나는 배고파요.', level: 2, topic: 'emotions' },
          { word: 'cozy', pronunciation: '/ˈkoʊzi/', meaning: '아늑한', example: 'This room is cozy.', exampleKorean: '이 방은 아늑해요.', level: 2, topic: 'emotions' },
          { word: 'meadow', pronunciation: '/ˈmedoʊ/', meaning: '초원', example: 'Flowers grow in the meadow.', exampleKorean: '초원에 꽃이 자라요.', level: 2, topic: 'nature' },
          { word: 'berries', pronunciation: '/ˈberiz/', meaning: '베리', example: 'I love to eat berries.', exampleKorean: '나는 베리 먹는 것을 좋아해요.', level: 2, topic: 'food' },
          { word: 'clearing', pronunciation: '/ˈklɪrɪŋ/', meaning: '빈터', example: 'They picnicked in a clearing.', exampleKorean: '그들은 빈터에서 소풍했어요.', level: 3, topic: 'nature' },
          { word: 'fence', pronunciation: '/fens/', meaning: '울타리', example: 'The fence is made of wood.', exampleKorean: '울타리는 나무로 만들어졌어요.', level: 2, topic: 'places' },
          { word: 'beautiful', pronunciation: '/ˈbjuːtɪfl/', meaning: '아름다운', example: 'The flowers are beautiful.', exampleKorean: '꽃들이 아름다워요.', level: 2, topic: 'emotions' },
          { word: 'grape', pronunciation: '/ɡreɪp/', meaning: '포도', example: 'I like grapes.', exampleKorean: '나는 포도를 좋아해요.', level: 2, topic: 'food' },
          { word: 'purple', pronunciation: '/ˈpɜːrpl/', meaning: '보라색의', example: 'The grapes are purple.', exampleKorean: '포도는 보라색이에요.', level: 2, topic: 'colors' },
          { word: 'delicious', pronunciation: '/dɪˈlɪʃəs/', meaning: '맛있는', example: 'This food is delicious.', exampleKorean: '이 음식은 맛있어요.', level: 2, topic: 'food' },
          { word: 'juice', pronunciation: '/dʒuːs/', meaning: '즙, 주스', example: 'I drink orange juice.', exampleKorean: '나는 오렌지 주스를 마셔요.', level: 2, topic: 'food' },
          { word: 'excitement', pronunciation: '/ɪkˈsaɪtmənt/', meaning: '흥분', example: 'She was full of excitement.', exampleKorean: '그녀는 흥분으로 가득 찼어요.', level: 3, topic: 'emotions' },
          { word: 'sweet', pronunciation: '/swiːt/', meaning: '달콤한', example: 'Candy is sweet.', exampleKorean: '사탕은 달콤해요.', level: 2, topic: 'food' },
          { word: 'juicy', pronunciation: '/ˈdʒuːsi/', meaning: '즙이 많은', example: 'Oranges are juicy.', exampleKorean: '오렌지는 즙이 많아요.', level: 2, topic: 'food' },
          { word: 'smell', pronunciation: '/smel/', meaning: '냄새', example: 'The smell of flowers is nice.', exampleKorean: '꽃 냄새가 좋아요.', level: 2, topic: 'nature' },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What season was it in the story?',
            questionKorean: '이야기에서 어떤 계절이었나요?',
            options: ['Winter', 'Summer', 'Spring', 'Fall'],
            correctAnswer: 1,
            explanation: 'The story says "One hot summer day".',
            explanationKorean: '이야기에서 "어느 더운 여름날"이라고 했어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'What color were the grapes?',
            questionKorean: '포도는 무슨 색이었나요?',
            options: ['Green', 'Red', 'Purple', 'Yellow'],
            correctAnswer: 2,
            explanation: 'The grapes were purple.',
            explanationKorean: '포도는 보라색이었어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Trying to Reach',
        titleKorean: '닿으려고 노력하다',
        content: `The Fox looked up at the grapes. They were hanging very [[high]] on the vine. "No problem," thought the Fox. "I am a [[clever]] fox. I can [[reach]] them easily."

The Fox [[jumped]] as high as he could. He [[stretched]] his legs and reached out his paws. But the grapes were too high! He could not [[touch]] them at all.

"Hmm," said the Fox. "Let me try again." He [[stepped]] back and took a [[deep]] breath. Then he jumped with more [[energy]]. But still, he [[failed]] to reach the grapes.

The Fox was [[determined]]. He would not give up! He [[tried]] many different ways to reach the grapes. He jumped from the left. He jumped from the right. He tried to [[climb]] the fence, but it was too old and [[weak]].

"I will try one more [[time]]," said the Fox, panting heavily. His legs were getting [[tired]]. He walked back many steps. Then he [[ran]] as fast as he could and jumped with all his [[strength]].

His paw almost touched the [[lowest]] bunch of grapes! But almost was not [[enough]]. He fell back down to the ground with a loud thump.

The grapes [[remained]] hanging peacefully on the vine, far out of the Fox's reach.`,
        contentKorean: `여우는 포도를 올려다봤어요. 포도는 덩굴 아주 높은 곳에 매달려 있었어요. "문제없어," 여우가 생각했어요. "나는 똑똑한 여우야. 쉽게 닿을 수 있어."

여우는 최대한 높이 점프했어요. 다리를 쭉 뻗고 발을 뻗었어요. 하지만 포도는 너무 높았어요! 전혀 닿을 수가 없었어요.

"흠," 여우가 말했어요. "다시 해볼게." 그는 뒤로 물러나서 깊은 숨을 쉬었어요. 그리고 더 많은 에너지를 담아 점프했어요. 하지만 여전히 포도에 닿지 못했어요.

여우는 결심했어요. 포기하지 않을 거예요! 그는 포도에 닿으려고 여러 가지 방법을 시도했어요. 왼쪽에서 점프했어요. 오른쪽에서 점프했어요. 울타리를 타고 오르려고 했지만, 너무 오래되고 약했어요.

"한 번만 더 해볼게," 여우가 헐떡이며 말했어요. 다리가 피곤해지고 있었어요. 그는 여러 걸음 뒤로 물러났어요. 그리고 최대한 빠르게 달려가서 온 힘을 다해 점프했어요.

발이 가장 낮은 포도 송이에 거의 닿았어요! 하지만 거의는 충분하지 않았어요. 그는 쿵 소리를 내며 땅으로 다시 떨어졌어요.

포도는 여우의 손이 닿지 않는 곳에서 평화롭게 매달려 있었어요.`,
        vocabulary: [
          { word: 'high', pronunciation: '/haɪ/', meaning: '높은', example: 'The mountain is very high.', exampleKorean: '그 산은 매우 높아요.', level: 2, topic: 'nature' },
          { word: 'clever', pronunciation: '/ˈklevər/', meaning: '똑똑한', example: 'She is a clever girl.', exampleKorean: '그녀는 똑똑한 소녀예요.', level: 2, topic: 'emotions' },
          { word: 'reach', pronunciation: '/riːtʃ/', meaning: '닿다, 도달하다', example: 'I cannot reach the top shelf.', exampleKorean: '나는 맨 위 선반에 닿을 수 없어요.', level: 2, topic: 'actions' },
          { word: 'jumped', pronunciation: '/dʒʌmpt/', meaning: '점프했다', example: 'The frog jumped into the pond.', exampleKorean: '개구리가 연못으로 점프했어요.', level: 2, topic: 'actions' },
          { word: 'stretched', pronunciation: '/stretʃt/', meaning: '뻗었다', example: 'She stretched her arms.', exampleKorean: '그녀는 팔을 뻗었어요.', level: 2, topic: 'actions' },
          { word: 'touch', pronunciation: '/tʌtʃ/', meaning: '닿다, 만지다', example: 'Don\'t touch the hot stove!', exampleKorean: '뜨거운 스토브를 만지지 마!', level: 2, topic: 'actions' },
          { word: 'stepped', pronunciation: '/stept/', meaning: '걸음을 옮겼다', example: 'He stepped forward.', exampleKorean: '그는 앞으로 걸어갔어요.', level: 2, topic: 'actions' },
          { word: 'deep', pronunciation: '/diːp/', meaning: '깊은', example: 'Take a deep breath.', exampleKorean: '깊은 숨을 쉬세요.', level: 2, topic: 'nature' },
          { word: 'energy', pronunciation: '/ˈenərdʒi/', meaning: '에너지, 힘', example: 'I have lots of energy today.', exampleKorean: '오늘 에너지가 넘쳐요.', level: 3, topic: 'body' },
          { word: 'failed', pronunciation: '/feɪld/', meaning: '실패했다', example: 'He failed the test.', exampleKorean: '그는 시험에 떨어졌어요.', level: 2, topic: 'actions' },
          { word: 'determined', pronunciation: '/dɪˈtɜːrmɪnd/', meaning: '결심한', example: 'She is determined to win.', exampleKorean: '그녀는 이기기로 결심했어요.', level: 3, topic: 'emotions' },
          { word: 'tried', pronunciation: '/traɪd/', meaning: '시도했다', example: 'She tried to solve the problem.', exampleKorean: '그녀는 문제를 풀려고 시도했어요.', level: 2, topic: 'actions' },
          { word: 'climb', pronunciation: '/klaɪm/', meaning: '오르다', example: 'Monkeys climb trees.', exampleKorean: '원숭이는 나무를 올라요.', level: 2, topic: 'actions' },
          { word: 'weak', pronunciation: '/wiːk/', meaning: '약한', example: 'The rope is too weak.', exampleKorean: '그 밧줄은 너무 약해요.', level: 2, topic: 'body' },
          { word: 'time', pronunciation: '/taɪm/', meaning: '시간, 번', example: 'What time is it?', exampleKorean: '몇 시예요?', level: 2, topic: 'time' },
          { word: 'tired', pronunciation: '/ˈtaɪərd/', meaning: '피곤한', example: 'I am tired after running.', exampleKorean: '달리고 나서 피곤해요.', level: 2, topic: 'emotions' },
          { word: 'ran', pronunciation: '/ræn/', meaning: '달렸다', example: 'The dog ran in the park.', exampleKorean: '개가 공원에서 달렸어요.', level: 2, topic: 'actions' },
          { word: 'strength', pronunciation: '/streŋθ/', meaning: '힘', example: 'He has great strength.', exampleKorean: '그는 큰 힘을 가지고 있어요.', level: 2, topic: 'body' },
          { word: 'lowest', pronunciation: '/ˈloʊɪst/', meaning: '가장 낮은', example: 'This is the lowest price.', exampleKorean: '이것이 가장 낮은 가격이에요.', level: 2, topic: 'numbers' },
          { word: 'enough', pronunciation: '/ɪˈnʌf/', meaning: '충분한', example: 'That is enough.', exampleKorean: '그것은 충분해요.', level: 2, topic: 'numbers' },
          { word: 'remained', pronunciation: '/rɪˈmeɪnd/', meaning: '남아 있었다', example: 'He remained calm.', exampleKorean: '그는 침착함을 유지했어요.', level: 3, topic: 'actions' },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'Why could the fox not get the grapes?',
            questionKorean: '여우가 왜 포도를 먹을 수 없었나요?',
            options: [
              'The grapes were too sour',
              'The grapes were too high',
              'The grapes were not ripe',
              'There were no grapes',
            ],
            correctAnswer: 1,
            explanation: 'The grapes were too high for the fox to reach.',
            explanationKorean: '포도는 여우가 닿기에 너무 높았어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'How many times did the fox try?',
            questionKorean: '여우는 몇 번이나 시도했나요?',
            options: ['Once', 'Twice', 'Many times', 'Never'],
            correctAnswer: 2,
            explanation: 'The fox tried again and again.',
            explanationKorean: '여우는 계속해서 시도했어요.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Moral',
        titleKorean: '교훈',
        content: `The Fox was very [[tired]] now. His legs [[hurt]], and his body [[ached]] from all the jumping. He sat down under a [[shady]] tree and looked at the grapes one more time.

The grapes still looked [[beautiful]] and delicious. They [[sparkled]] in the afternoon sunlight. The Fox's stomach growled [[loudly]].

But then something [[changed]] in the Fox's [[mind]]. He didn't want to [[admit]] that he couldn't get the grapes. That would be too [[embarrassing]]!

"Hmph," said the Fox, lifting his nose up into the air. "I didn't really [[want]] those grapes [[anyway]]. I just [[realized]] something. Those grapes are probably [[sour]]! Yes, that's right. Sour and [[terrible]]!"

The Fox stood up and [[brushed]] the dust off his fur. "I am a [[smart]] fox," he told himself. "Why would I want sour grapes? Only a [[foolish]] animal would want those nasty grapes."

Then the Fox [[walked]] away, [[pretending]] he didn't care at all. But deep down in his heart, he [[knew]] the truth. He had wanted those grapes very much. He was just too [[proud]] to say so.

A [[wise]] old owl was watching from a nearby tree. She shook her head slowly.

**Moral of the story:** It is [[easy]] to [[hate]] what you cannot have. Sometimes we say bad things about the things we cannot get. We should be [[honest]] with ourselves instead.`,
        contentKorean: `여우는 이제 매우 피곤했어요. 다리가 아팠고, 온 몸이 점프 때문에 쑤셨어요. 그는 그늘진 나무 아래 앉아서 포도를 한 번 더 바라보았어요.

포도는 여전히 아름답고 맛있어 보였어요. 오후 햇살에 반짝이고 있었어요. 여우의 배가 크게 꼬르륵 소리를 냈어요.

하지만 그때 여우의 마음에 변화가 생겼어요. 그는 포도를 얻을 수 없다는 것을 인정하고 싶지 않았어요. 그건 너무 창피한 일이니까요!

"흥," 여우가 코를 위로 치켜들며 말했어요. "나는 정말로 저 포도를 원하지 않았어. 방금 깨달았어. 저 포도는 아마 신 맛일 거야! 그래, 맞아. 시고 맛없을 거야!"

여우는 일어나서 털에 묻은 먼지를 털었어요. "나는 똑똑한 여우야," 그가 스스로에게 말했어요. "왜 신 포도를 원하겠어? 어리석은 동물만 저 끔찍한 포도를 원할 거야."

그리고 여우는 전혀 신경 쓰지 않는 척하며 걸어갔어요. 하지만 마음 깊은 곳에서는 진실을 알고 있었어요. 그는 정말로 그 포도를 원했어요. 그냥 그렇게 말하기엔 너무 자존심이 상했을 뿐이에요.

현명한 늙은 부엉이가 가까운 나무에서 지켜보고 있었어요. 부엉이는 천천히 고개를 저었어요.

**이야기의 교훈:** 가질 수 없는 것을 싫어하기는 쉬워요. 때때로 우리는 얻을 수 없는 것에 대해 나쁜 말을 해요. 대신 우리 자신에게 정직해야 해요.`,
        vocabulary: [
          { word: 'tired', pronunciation: '/ˈtaɪərd/', meaning: '피곤한', example: 'I am tired after running.', exampleKorean: '달리고 나서 피곤해요.', level: 2, topic: 'emotions' },
          { word: 'hurt', pronunciation: '/hɜːrt/', meaning: '아프다', example: 'My head hurts.', exampleKorean: '머리가 아파요.', level: 2, topic: 'body' },
          { word: 'ached', pronunciation: '/eɪkt/', meaning: '쑤시다', example: 'My legs ached after the long walk.', exampleKorean: '오래 걸어서 다리가 쑤셨어요.', level: 3, topic: 'body' },
          { word: 'shady', pronunciation: '/ˈʃeɪdi/', meaning: '그늘진', example: 'Let\'s sit under that shady tree.', exampleKorean: '저 그늘진 나무 아래에 앉자.', level: 2, topic: 'nature' },
          { word: 'beautiful', pronunciation: '/ˈbjuːtɪfl/', meaning: '아름다운', example: 'The sunset is beautiful.', exampleKorean: '석양이 아름다워요.', level: 2, topic: 'emotions' },
          { word: 'sparkled', pronunciation: '/ˈspɑːrkld/', meaning: '반짝였다', example: 'The diamonds sparkled.', exampleKorean: '다이아몬드가 반짝였어요.', level: 3, topic: 'nature' },
          { word: 'loudly', pronunciation: '/ˈlaʊdli/', meaning: '크게', example: 'She laughed loudly.', exampleKorean: '그녀는 크게 웃었어요.', level: 2, topic: 'actions' },
          { word: 'changed', pronunciation: '/tʃeɪndʒd/', meaning: '변했다', example: 'The weather changed.', exampleKorean: '날씨가 변했어요.', level: 2, topic: 'actions' },
          { word: 'mind', pronunciation: '/maɪnd/', meaning: '마음, 생각', example: 'I changed my mind.', exampleKorean: '마음이 바뀌었어요.', level: 2, topic: 'emotions' },
          { word: 'admit', pronunciation: '/ədˈmɪt/', meaning: '인정하다', example: 'I admit I was wrong.', exampleKorean: '내가 틀렸다고 인정해요.', level: 3, topic: 'actions' },
          { word: 'embarrassing', pronunciation: '/ɪmˈbærəsɪŋ/', meaning: '창피한', example: 'That was embarrassing.', exampleKorean: '그건 창피했어요.', level: 3, topic: 'emotions' },
          { word: 'want', pronunciation: '/wɑːnt/', meaning: '원하다', example: 'I want some water.', exampleKorean: '물을 좀 원해요.', level: 2, topic: 'emotions' },
          { word: 'anyway', pronunciation: '/ˈeniweɪ/', meaning: '어쨌든', example: 'Let\'s go anyway.', exampleKorean: '어쨌든 가자.', level: 2, topic: 'time' },
          { word: 'realized', pronunciation: '/ˈriːəlaɪzd/', meaning: '깨달았다', example: 'I realized my mistake.', exampleKorean: '내 실수를 깨달았어요.', level: 3, topic: 'emotions' },
          { word: 'sour', pronunciation: '/ˈsaʊər/', meaning: '신', example: 'Lemons taste sour.', exampleKorean: '레몬은 신 맛이 나요.', level: 2, topic: 'food' },
          { word: 'terrible', pronunciation: '/ˈterəbl/', meaning: '끔찍한', example: 'The weather is terrible.', exampleKorean: '날씨가 끔찍해요.', level: 2, topic: 'emotions' },
          { word: 'brushed', pronunciation: '/brʌʃt/', meaning: '털었다', example: 'She brushed her hair.', exampleKorean: '그녀는 머리를 빗었어요.', level: 2, topic: 'actions' },
          { word: 'smart', pronunciation: '/smɑːrt/', meaning: '똑똑한', example: 'He is a smart boy.', exampleKorean: '그는 똑똑한 소년이에요.', level: 2, topic: 'emotions' },
          { word: 'foolish', pronunciation: '/ˈfuːlɪʃ/', meaning: '어리석은', example: 'That was a foolish mistake.', exampleKorean: '그건 어리석은 실수였어요.', level: 3, topic: 'emotions' },
          { word: 'walked', pronunciation: '/wɔːkt/', meaning: '걸었다', example: 'She walked to school.', exampleKorean: '그녀는 학교까지 걸어갔어요.', level: 2, topic: 'actions' },
          { word: 'pretending', pronunciation: '/prɪˈtendɪŋ/', meaning: '~인 척하는', example: 'He is pretending to sleep.', exampleKorean: '그는 자는 척하고 있어요.', level: 2, topic: 'actions' },
          { word: 'knew', pronunciation: '/nuː/', meaning: '알았다', example: 'I knew the answer.', exampleKorean: '나는 답을 알았어요.', level: 2, topic: 'actions' },
          { word: 'proud', pronunciation: '/praʊd/', meaning: '자존심 센', example: 'He is too proud to ask for help.', exampleKorean: '그는 도움을 요청하기엔 너무 자존심이 세요.', level: 2, topic: 'emotions' },
          { word: 'wise', pronunciation: '/waɪz/', meaning: '현명한', example: 'The owl is wise.', exampleKorean: '부엉이는 현명해요.', level: 2, topic: 'emotions' },
          { word: 'easy', pronunciation: '/ˈiːzi/', meaning: '쉬운', example: 'This question is easy.', exampleKorean: '이 문제는 쉬워요.', level: 2, topic: 'school' },
          { word: 'hate', pronunciation: '/heɪt/', meaning: '싫어하다', example: 'I hate cold weather.', exampleKorean: '나는 추운 날씨가 싫어요.', level: 2, topic: 'emotions' },
          { word: 'honest', pronunciation: '/ˈɑːnɪst/', meaning: '정직한', example: 'Always be honest.', exampleKorean: '항상 정직하세요.', level: 2, topic: 'emotions' },
        ],
        quiz: [
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'What did the fox say about the grapes at the end?',
            questionKorean: '여우가 마지막에 포도에 대해 뭐라고 말했나요?',
            options: [
              'They are delicious',
              'They are probably sour',
              'They are beautiful',
              'They are too small',
            ],
            correctAnswer: 1,
            explanation: 'The fox said the grapes are probably sour.',
            explanationKorean: '여우는 포도가 아마 신 맛일 거라고 말했어요.',
          },
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'What is the moral of this story?',
            questionKorean: '이 이야기의 교훈은 무엇인가요?',
            options: [
              'Always eat grapes',
              'Foxes are clever',
              'It is easy to hate what you cannot have',
              'Never give up',
            ],
            correctAnswer: 2,
            explanation: 'The moral is: It is easy to hate what you cannot have.',
            explanationKorean: '교훈은: 가질 수 없는 것을 싫어하기는 쉽다는 것이에요.',
          },
        ],
      },
    ],
  },
  {
    id: 'aesop-tortoise-hare',
    title: 'The Tortoise and the Hare',
    titleKorean: '거북이와 토끼',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A slow tortoise races a fast hare.',
    descriptionKorean: '느린 거북이가 빠른 토끼와 경주해요.',
    estimatedMinutes: 6,
    totalWords: 180,
    chapters: [
      {
        id: 'ch1',
        title: 'The Challenge',
        titleKorean: '도전',
        content: `Once upon a time, there was a Hare who was very [[proud]] of how [[fast]] he could run.

"I am the [[fastest]] animal in the [[forest]]!" said the Hare. "Nobody can beat me in a [[race]]!"

A [[slow]] Tortoise heard the Hare. "I will race you," said the Tortoise [[quietly]].

All the animals [[laughed]]. "You? Race the Hare? That's [[impossible]]!"`,
        contentKorean: `옛날 옛적에, 자신이 얼마나 빨리 달릴 수 있는지 매우 자랑스러워하는 토끼가 있었어요.

"나는 숲에서 가장 빠른 동물이야!" 토끼가 말했어요. "아무도 경주에서 나를 이길 수 없어!"

느린 거북이가 토끼의 말을 들었어요. "내가 너와 경주할게," 거북이가 조용히 말했어요.

모든 동물들이 웃었어요. "너가? 토끼와 경주한다고? 그건 불가능해!"`,
        vocabulary: [
          {
            word: 'proud',
            pronunciation: '/praʊd/',
            meaning: '자랑스러운',
            example: 'I am proud of my work.',
            exampleKorean: '나는 내 작품이 자랑스러워요.',
            level: 2,
            topic: 'emotions',
          },
          {
            word: 'fast',
            pronunciation: '/fæst/',
            meaning: '빠른',
            example: 'The car is very fast.',
            exampleKorean: '그 차는 매우 빨라요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'fastest',
            pronunciation: '/ˈfæstɪst/',
            meaning: '가장 빠른',
            example: 'She is the fastest runner.',
            exampleKorean: '그녀는 가장 빠른 주자예요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'forest',
            pronunciation: '/ˈfɔːrɪst/',
            meaning: '숲',
            example: 'Animals live in the forest.',
            exampleKorean: '동물들이 숲에 살아요.',
            level: 2,
            topic: 'nature',
          },
          {
            word: 'race',
            pronunciation: '/reɪs/',
            meaning: '경주',
            example: 'Let\'s have a race!',
            exampleKorean: '경주하자!',
            level: 2,
            topic: 'sports',
          },
          {
            word: 'slow',
            pronunciation: '/sloʊ/',
            meaning: '느린',
            example: 'The turtle is slow.',
            exampleKorean: '거북이는 느려요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'quietly',
            pronunciation: '/ˈkwaɪətli/',
            meaning: '조용히',
            example: 'Please speak quietly.',
            exampleKorean: '조용히 말해 주세요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'laughed',
            pronunciation: '/læft/',
            meaning: '웃었다',
            example: 'Everyone laughed at the joke.',
            exampleKorean: '모두가 농담에 웃었어요.',
            level: 2,
            topic: 'emotions',
          },
          {
            word: 'impossible',
            pronunciation: '/ɪmˈpɑːsəbl/',
            meaning: '불가능한',
            example: 'Nothing is impossible.',
            exampleKorean: '불가능한 것은 없어요.',
            level: 2,
            topic: 'school',
          },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What was the Hare proud of?',
            questionKorean: '토끼는 무엇을 자랑스러워했나요?',
            options: ['His strength', 'His speed', 'His intelligence', 'His looks'],
            correctAnswer: 1,
            explanation: 'The Hare was proud of how fast he could run.',
            explanationKorean: '토끼는 얼마나 빨리 달릴 수 있는지 자랑스러워했어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Who challenged the Hare to a race?',
            questionKorean: '누가 토끼에게 경주를 제안했나요?',
            options: ['The Fox', 'The Lion', 'The Tortoise', 'The Bear'],
            correctAnswer: 2,
            explanation: 'The Tortoise challenged the Hare.',
            explanationKorean: '거북이가 토끼에게 도전했어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The Race Begins',
        titleKorean: '경주 시작',
        content: `The next day, the race [[began]]. The Fox said, "Ready, set, go!"

The Hare [[ran]] very fast. He was far [[ahead]] of the Tortoise in just a few [[seconds]].

"This is too [[easy]]," thought the Hare. He looked [[back]] and saw the Tortoise was very far [[behind]].

"I have plenty of [[time]]," said the Hare. "I'll take a little [[nap]] under this [[tree]]."

The Hare lay down and soon fell [[asleep]].`,
        contentKorean: `다음 날, 경주가 시작되었어요. 여우가 말했어요, "준비, 땅, 출발!"

토끼는 매우 빨리 달렸어요. 그는 단 몇 초 만에 거북이보다 훨씬 앞서 있었어요.

"이건 너무 쉽네," 토끼가 생각했어요. 뒤를 돌아보니 거북이는 훨씬 뒤에 있었어요.

"시간이 충분해," 토끼가 말했어요. "이 나무 아래에서 잠깐 낮잠을 자야겠다."

토끼는 누워서 곧 잠들었어요.`,
        vocabulary: [
          {
            word: 'began',
            pronunciation: '/bɪˈɡæn/',
            meaning: '시작되었다',
            example: 'The movie began at 7 pm.',
            exampleKorean: '영화가 저녁 7시에 시작되었어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'ran',
            pronunciation: '/ræn/',
            meaning: '달렸다',
            example: 'He ran to school.',
            exampleKorean: '그는 학교까지 달렸어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'ahead',
            pronunciation: '/əˈhed/',
            meaning: '앞에',
            example: 'Go straight ahead.',
            exampleKorean: '앞으로 직진하세요.',
            level: 2,
            topic: 'places',
          },
          {
            word: 'seconds',
            pronunciation: '/ˈsekəndz/',
            meaning: '초',
            example: 'Wait a few seconds.',
            exampleKorean: '몇 초만 기다려요.',
            level: 2,
            topic: 'time',
          },
          {
            word: 'easy',
            pronunciation: '/ˈiːzi/',
            meaning: '쉬운',
            example: 'The test was easy.',
            exampleKorean: '시험은 쉬웠어요.',
            level: 2,
            topic: 'school',
          },
          {
            word: 'back',
            pronunciation: '/bæk/',
            meaning: '뒤',
            example: 'Look back!',
            exampleKorean: '뒤를 봐!',
            level: 2,
            topic: 'places',
          },
          {
            word: 'behind',
            pronunciation: '/bɪˈhaɪnd/',
            meaning: '뒤에',
            example: 'The cat is behind the sofa.',
            exampleKorean: '고양이가 소파 뒤에 있어요.',
            level: 2,
            topic: 'places',
          },
          {
            word: 'nap',
            pronunciation: '/næp/',
            meaning: '낮잠',
            example: 'I took a nap.',
            exampleKorean: '나는 낮잠을 잤어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'tree',
            pronunciation: '/triː/',
            meaning: '나무',
            example: 'Birds live in trees.',
            exampleKorean: '새들은 나무에 살아요.',
            level: 2,
            topic: 'nature',
          },
          {
            word: 'asleep',
            pronunciation: '/əˈsliːp/',
            meaning: '잠든',
            example: 'The baby fell asleep.',
            exampleKorean: '아기가 잠들었어요.',
            level: 2,
            topic: 'actions',
          },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'What did the Hare do during the race?',
            questionKorean: '토끼는 경주 중에 무엇을 했나요?',
            options: ['Kept running', 'Ate lunch', 'Took a nap', 'Went swimming'],
            correctAnswer: 2,
            explanation: 'The Hare took a nap under a tree.',
            explanationKorean: '토끼는 나무 아래에서 낮잠을 잤어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'Why did the Hare think he could sleep?',
            questionKorean: '왜 토끼는 잠을 잘 수 있다고 생각했나요?',
            options: [
              'He was tired',
              'He was so far ahead',
              'He was sick',
              'The race was over',
            ],
            correctAnswer: 1,
            explanation: 'He thought he had plenty of time because he was far ahead.',
            explanationKorean: '그는 훨씬 앞서 있어서 시간이 충분하다고 생각했어요.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Winner',
        titleKorean: '승자',
        content: `Meanwhile, the Tortoise [[kept]] walking. He didn't [[stop]]. He didn't rest. He just kept [[moving]] forward, step by step.

The Tortoise [[passed]] the sleeping Hare. He was getting [[closer]] to the finish line.

[[Finally]], the Hare woke up. He saw the Tortoise was almost at the finish line!

The Hare ran as [[fast]] as he could, but it was too [[late]]. The Tortoise [[won]] the race!

**Moral of the story:** [[Slow]] and [[steady]] wins the race.`,
        contentKorean: `그러는 동안, 거북이는 계속 걸었어요. 멈추지 않았어요. 쉬지 않았어요. 그냥 한 걸음씩 앞으로 나아갔어요.

거북이는 잠자는 토끼를 지나쳤어요. 결승선에 점점 가까워지고 있었어요.

마침내, 토끼가 깨어났어요. 그는 거북이가 거의 결승선에 다다른 것을 봤어요!

토끼는 최대한 빨리 달렸지만, 너무 늦었어요. 거북이가 경주에서 이겼어요!

**이야기의 교훈:** 느리고 꾸준하면 경주에서 이길 수 있어요.`,
        vocabulary: [
          {
            word: 'kept',
            pronunciation: '/kept/',
            meaning: '계속했다',
            example: 'She kept studying.',
            exampleKorean: '그녀는 계속 공부했어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'stop',
            pronunciation: '/stɑːp/',
            meaning: '멈추다',
            example: 'Please stop running.',
            exampleKorean: '달리는 것을 멈춰주세요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'moving',
            pronunciation: '/ˈmuːvɪŋ/',
            meaning: '움직이는',
            example: 'The car is moving.',
            exampleKorean: '차가 움직이고 있어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'passed',
            pronunciation: '/pæst/',
            meaning: '지나쳤다',
            example: 'The bus passed by.',
            exampleKorean: '버스가 지나갔어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'closer',
            pronunciation: '/ˈkloʊsər/',
            meaning: '더 가까이',
            example: 'Come closer!',
            exampleKorean: '더 가까이 와!',
            level: 2,
            topic: 'places',
          },
          {
            word: 'finally',
            pronunciation: '/ˈfaɪnəli/',
            meaning: '마침내',
            example: 'Finally, we arrived.',
            exampleKorean: '마침내 도착했어요.',
            level: 2,
            topic: 'time',
          },
          {
            word: 'late',
            pronunciation: '/leɪt/',
            meaning: '늦은',
            example: 'I was late for school.',
            exampleKorean: '학교에 늦었어요.',
            level: 2,
            topic: 'time',
          },
          {
            word: 'won',
            pronunciation: '/wʌn/',
            meaning: '이겼다',
            example: 'Our team won the game.',
            exampleKorean: '우리 팀이 경기에서 이겼어요.',
            level: 2,
            topic: 'sports',
          },
          {
            word: 'slow',
            pronunciation: '/sloʊ/',
            meaning: '느린',
            example: 'Go slow.',
            exampleKorean: '천천히 가세요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'steady',
            pronunciation: '/ˈstedi/',
            meaning: '꾸준한',
            example: 'Keep a steady pace.',
            exampleKorean: '꾸준한 속도를 유지하세요.',
            level: 2,
            topic: 'actions',
          },
        ],
        quiz: [
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Who won the race?',
            questionKorean: '누가 경주에서 이겼나요?',
            options: ['The Hare', 'The Tortoise', 'The Fox', 'Nobody'],
            correctAnswer: 1,
            explanation: 'The Tortoise won the race.',
            explanationKorean: '거북이가 경주에서 이겼어요.',
          },
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'What is the moral of this story?',
            questionKorean: '이 이야기의 교훈은 무엇인가요?',
            options: [
              'Fast is always better',
              'Sleep helps you win',
              'Slow and steady wins the race',
              'Never race with others',
            ],
            correctAnswer: 2,
            explanation: 'Slow and steady wins the race.',
            explanationKorean: '느리고 꾸준하면 경주에서 이길 수 있어요.',
          },
        ],
      },
    ],
  },
  {
    id: 'aesop-lion-mouse',
    title: 'The Lion and the Mouse',
    titleKorean: '사자와 생쥐',
    author: 'Aesop',
    collection: 'aesop',
    level: 2,
    description: 'A tiny mouse helps a mighty lion.',
    descriptionKorean: '작은 생쥐가 강한 사자를 도와요.',
    estimatedMinutes: 5,
    totalWords: 160,
    chapters: [
      {
        id: 'ch1',
        title: 'The Sleeping Lion',
        titleKorean: '잠자는 사자',
        content: `One day, a great [[Lion]] was [[sleeping]] in the [[forest]]. A little [[Mouse]] ran over his [[nose]].

The Lion woke up and [[caught]] the Mouse with his big [[paw]].

"How dare you [[wake]] me up!" roared the Lion. "I will [[eat]] you for this!"

"Please, great Lion," [[cried]] the Mouse. "Please let me go! One day I will [[help]] you!"

The Lion [[laughed]]. "How can a [[tiny]] mouse help a mighty lion?"`,
        contentKorean: `어느 날, 큰 사자가 숲에서 자고 있었어요. 작은 생쥐가 사자의 코 위를 달렸어요.

사자가 일어나서 큰 발로 생쥐를 잡았어요.

"감히 나를 깨워!" 사자가 으르렁거렸어요. "이것 때문에 너를 먹어버리겠다!"

"제발요, 위대한 사자님," 생쥐가 울었어요. "제발 보내주세요! 언젠가 제가 도와드릴게요!"

사자가 웃었어요. "어떻게 작은 생쥐가 강한 사자를 도울 수 있지?"`,
        vocabulary: [
          {
            word: 'lion',
            pronunciation: '/ˈlaɪən/',
            meaning: '사자',
            example: 'The lion is the king of animals.',
            exampleKorean: '사자는 동물의 왕이에요.',
            level: 2,
            topic: 'animals',
          },
          {
            word: 'sleeping',
            pronunciation: '/ˈsliːpɪŋ/',
            meaning: '자고 있는',
            example: 'The baby is sleeping.',
            exampleKorean: '아기가 자고 있어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'mouse',
            pronunciation: '/maʊs/',
            meaning: '생쥐',
            example: 'The mouse likes cheese.',
            exampleKorean: '생쥐는 치즈를 좋아해요.',
            level: 2,
            topic: 'animals',
          },
          {
            word: 'nose',
            pronunciation: '/noʊz/',
            meaning: '코',
            example: 'I have a small nose.',
            exampleKorean: '나는 작은 코를 가지고 있어요.',
            level: 2,
            topic: 'body',
          },
          {
            word: 'caught',
            pronunciation: '/kɔːt/',
            meaning: '잡았다',
            example: 'I caught the ball.',
            exampleKorean: '나는 공을 잡았어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'paw',
            pronunciation: '/pɔː/',
            meaning: '발 (동물의)',
            example: 'The cat has soft paws.',
            exampleKorean: '고양이는 부드러운 발을 가지고 있어요.',
            level: 2,
            topic: 'animals',
          },
          {
            word: 'wake',
            pronunciation: '/weɪk/',
            meaning: '깨우다',
            example: 'Please wake me up at 7.',
            exampleKorean: '7시에 깨워 주세요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'cried',
            pronunciation: '/kraɪd/',
            meaning: '울었다, 외쳤다',
            example: 'She cried for help.',
            exampleKorean: '그녀가 도움을 요청하며 소리쳤어요.',
            level: 2,
            topic: 'emotions',
          },
          {
            word: 'help',
            pronunciation: '/help/',
            meaning: '돕다',
            example: 'Can you help me?',
            exampleKorean: '도와줄 수 있어요?',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'tiny',
            pronunciation: '/ˈtaɪni/',
            meaning: '아주 작은',
            example: 'The ant is tiny.',
            exampleKorean: '개미는 아주 작아요.',
            level: 2,
            topic: 'nature',
          },
        ],
        quiz: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What woke up the lion?',
            questionKorean: '무엇이 사자를 깨웠나요?',
            options: ['A bird', 'A mouse', 'A rabbit', 'Thunder'],
            correctAnswer: 1,
            explanation: 'A mouse ran over the lion\'s nose and woke him up.',
            explanationKorean: '생쥐가 사자의 코 위를 달리면서 깨웠어요.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'What did the mouse promise?',
            questionKorean: '생쥐는 무엇을 약속했나요?',
            options: ['To bring food', 'To help the lion one day', 'To never come back', 'To sing a song'],
            correctAnswer: 1,
            explanation: 'The mouse promised to help the lion one day.',
            explanationKorean: '생쥐는 언젠가 사자를 도와주겠다고 약속했어요.',
          },
        ],
      },
      {
        id: 'ch2',
        title: 'The Trapped Lion',
        titleKorean: '덫에 걸린 사자',
        content: `But the Lion was [[kind]]. He let the Mouse go.

A few days [[later]], the Lion was walking in the forest. [[Suddenly]], he stepped into a [[trap]]! He was caught in a [[net]].

The Lion [[tried]] to [[escape]], but he could not. He [[roared]] loudly for help.

The little Mouse [[heard]] the Lion's cries. He [[remembered]] his promise.

"Don't [[worry]], Lion! I will save you!" said the Mouse.`,
        contentKorean: `하지만 사자는 친절했어요. 그는 생쥐를 보내주었어요.

며칠 후, 사자가 숲을 걷고 있었어요. 갑자기, 그는 덫에 빠졌어요! 그물에 걸렸어요.

사자는 탈출하려고 했지만, 할 수 없었어요. 그는 도움을 요청하며 크게 으르렁거렸어요.

작은 생쥐가 사자의 울음소리를 들었어요. 그는 자신의 약속을 기억했어요.

"걱정하지 마세요, 사자님! 제가 구해드릴게요!" 생쥐가 말했어요.`,
        vocabulary: [
          {
            word: 'kind',
            pronunciation: '/kaɪnd/',
            meaning: '친절한',
            example: 'She is very kind.',
            exampleKorean: '그녀는 매우 친절해요.',
            level: 2,
            topic: 'emotions',
          },
          {
            word: 'later',
            pronunciation: '/ˈleɪtər/',
            meaning: '나중에',
            example: 'See you later!',
            exampleKorean: '나중에 봐요!',
            level: 2,
            topic: 'time',
          },
          {
            word: 'suddenly',
            pronunciation: '/ˈsʌdənli/',
            meaning: '갑자기',
            example: 'Suddenly, it started raining.',
            exampleKorean: '갑자기 비가 오기 시작했어요.',
            level: 2,
            topic: 'time',
          },
          {
            word: 'trap',
            pronunciation: '/træp/',
            meaning: '덫',
            example: 'The hunter set a trap.',
            exampleKorean: '사냥꾼이 덫을 놓았어요.',
            level: 2,
            topic: 'nature',
          },
          {
            word: 'net',
            pronunciation: '/net/',
            meaning: '그물',
            example: 'The fish is in the net.',
            exampleKorean: '물고기가 그물 안에 있어요.',
            level: 2,
            topic: 'nature',
          },
          {
            word: 'escape',
            pronunciation: '/ɪˈskeɪp/',
            meaning: '탈출하다',
            example: 'The bird escaped from the cage.',
            exampleKorean: '새가 새장에서 탈출했어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'roared',
            pronunciation: '/rɔːrd/',
            meaning: '으르렁거렸다',
            example: 'The lion roared loudly.',
            exampleKorean: '사자가 크게 으르렁거렸어요.',
            level: 2,
            topic: 'animals',
          },
          {
            word: 'heard',
            pronunciation: '/hɜːrd/',
            meaning: '들었다',
            example: 'I heard a strange sound.',
            exampleKorean: '나는 이상한 소리를 들었어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'remembered',
            pronunciation: '/rɪˈmembərd/',
            meaning: '기억했다',
            example: 'I remembered her name.',
            exampleKorean: '나는 그녀의 이름을 기억했어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'worry',
            pronunciation: '/ˈwɜːri/',
            meaning: '걱정하다',
            example: 'Don\'t worry about it.',
            exampleKorean: '그것에 대해 걱정하지 마세요.',
            level: 2,
            topic: 'emotions',
          },
        ],
        quiz: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'What happened to the lion?',
            questionKorean: '사자에게 무슨 일이 일어났나요?',
            options: ['He got sick', 'He fell in a trap', 'He got lost', 'He found food'],
            correctAnswer: 1,
            explanation: 'The lion stepped into a trap and was caught in a net.',
            explanationKorean: '사자가 덫에 빠져서 그물에 걸렸어요.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'Who came to help the lion?',
            questionKorean: '누가 사자를 도우러 왔나요?',
            options: ['Other lions', 'The mouse', 'Hunters', 'Birds'],
            correctAnswer: 1,
            explanation: 'The little mouse came to help the lion.',
            explanationKorean: '작은 생쥐가 사자를 도우러 왔어요.',
          },
        ],
      },
      {
        id: 'ch3',
        title: 'The Rescue',
        titleKorean: '구출',
        content: `The Mouse [[began]] to [[chew]] the ropes of the net. He chewed and chewed with his [[sharp]] little [[teeth]].

[[Soon]], the ropes [[broke]]. The Lion was [[free]]!

"Thank you, little Mouse!" said the Lion. "I was [[wrong]] about you. Even a [[small]] [[friend]] can be a [[great]] help."

**Moral of the story:** [[Little]] friends can be great friends.`,
        contentKorean: `생쥐는 그물의 줄을 갉아먹기 시작했어요. 그는 날카로운 작은 이빨로 계속 갉아먹었어요.

곧, 줄이 끊어졌어요. 사자는 자유로워졌어요!

"고마워, 작은 생쥐야!" 사자가 말했어요. "내가 너에 대해 틀렸어. 작은 친구도 큰 도움이 될 수 있구나."

**이야기의 교훈:** 작은 친구도 좋은 친구가 될 수 있어요.`,
        vocabulary: [
          {
            word: 'began',
            pronunciation: '/bɪˈɡæn/',
            meaning: '시작했다',
            example: 'The class began at 9 am.',
            exampleKorean: '수업이 오전 9시에 시작했어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'chew',
            pronunciation: '/tʃuː/',
            meaning: '씹다, 갉다',
            example: 'Chew your food well.',
            exampleKorean: '음식을 잘 씹으세요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'sharp',
            pronunciation: '/ʃɑːrp/',
            meaning: '날카로운',
            example: 'The knife is sharp.',
            exampleKorean: '칼이 날카로워요.',
            level: 2,
            topic: 'nature',
          },
          {
            word: 'teeth',
            pronunciation: '/tiːθ/',
            meaning: '이빨',
            example: 'Brush your teeth.',
            exampleKorean: '이를 닦으세요.',
            level: 2,
            topic: 'body',
          },
          {
            word: 'soon',
            pronunciation: '/suːn/',
            meaning: '곧',
            example: 'I will come soon.',
            exampleKorean: '곧 갈게요.',
            level: 2,
            topic: 'time',
          },
          {
            word: 'broke',
            pronunciation: '/broʊk/',
            meaning: '부러졌다',
            example: 'The window broke.',
            exampleKorean: '창문이 깨졌어요.',
            level: 2,
            topic: 'actions',
          },
          {
            word: 'free',
            pronunciation: '/friː/',
            meaning: '자유로운',
            example: 'The bird is free.',
            exampleKorean: '새가 자유로워요.',
            level: 2,
            topic: 'emotions',
          },
          {
            word: 'wrong',
            pronunciation: '/rɔːŋ/',
            meaning: '틀린',
            example: 'I was wrong.',
            exampleKorean: '내가 틀렸어요.',
            level: 2,
            topic: 'school',
          },
          {
            word: 'small',
            pronunciation: '/smɔːl/',
            meaning: '작은',
            example: 'The mouse is small.',
            exampleKorean: '생쥐는 작아요.',
            level: 2,
            topic: 'nature',
          },
          {
            word: 'great',
            pronunciation: '/ɡreɪt/',
            meaning: '훌륭한, 큰',
            example: 'You did a great job!',
            exampleKorean: '정말 잘했어요!',
            level: 2,
            topic: 'emotions',
          },
        ],
        quiz: [
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'How did the mouse free the lion?',
            questionKorean: '생쥐는 어떻게 사자를 자유롭게 했나요?',
            options: ['He cut the rope with scissors', 'He chewed the ropes', 'He called for help', 'He untied the knots'],
            correctAnswer: 1,
            explanation: 'The mouse chewed the ropes with his sharp teeth.',
            explanationKorean: '생쥐가 날카로운 이빨로 줄을 갉아먹었어요.',
          },
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'What is the moral of this story?',
            questionKorean: '이 이야기의 교훈은 무엇인가요?',
            options: [
              'Big animals are always stronger',
              'Little friends can be great friends',
              'Never trust anyone',
              'Traps are dangerous',
            ],
            correctAnswer: 1,
            explanation: 'Little friends can be great friends.',
            explanationKorean: '작은 친구도 좋은 친구가 될 수 있어요.',
          },
        ],
      },
    ],
  },
];

// Combine all stories
export const STORIES: Story[] = [...AESOP_STORIES, ...MORE_AESOP_STORIES];
