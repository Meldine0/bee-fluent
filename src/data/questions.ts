export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  { id: 1, text: "I _____ to the cinema yesterday.", options: ["go", "went", "gone", "going"], correctIndex: 1 },
  { id: 2, text: "She _____ English for three years.", options: ["is learning", "learns", "has been learning", "learned"], correctIndex: 2 },
  { id: 3, text: "If I _____ rich, I would buy a boat.", options: ["am", "was", "were", "have been"], correctIndex: 2 },
  { id: 4, text: "We don't have _____ milk left.", options: ["some", "any", "no", "many"], correctIndex: 1 },
  { id: 5, text: "He is the man _____ helped me.", options: ["which", "whose", "who", "whom"], correctIndex: 2 },
  { id: 6, text: "I'm looking forward _____ you.", options: ["to see", "seeing", "to seeing", "see"], correctIndex: 2 },
  { id: 7, text: "They _____ finished their homework yet.", options: ["didn't", "haven't", "don't", "aren't"], correctIndex: 1 },
  { id: 8, text: "You _____ smoke in the hospital.", options: ["mustn't", "don't have to", "needn't", "shouldn't to"], correctIndex: 0 },
  { id: 9, text: "By this time next year, I _____ my degree.", options: ["will finish", "will have finished", "finish", "am finishing"], correctIndex: 1 },
  { id: 10, text: "The book was written _____ Mark Twain.", options: ["from", "with", "by", "of"], correctIndex: 2 },
  { id: 11, text: "I wish I _____ more time.", options: ["have", "had", "will have", "can have"], correctIndex: 1 },
  { id: 12, text: "She asked me where _____.", options: ["was I going", "I was going", "am I going", "I am going"], correctIndex: 1 },
  { id: 13, text: "Despite _____ tired, he kept working.", options: ["be", "to be", "being", "been"], correctIndex: 2 },
  { id: 14, text: "I'm not used _____ up so early.", options: ["to get", "getting", "to getting", "get"], correctIndex: 2 },
  { id: 15, text: "If you had called me, I _____.", options: ["would come", "came", "will come", "would have come"], correctIndex: 3 },
  { id: 16, text: "He denied _____ the money.", options: ["to steal", "stealing", "stole", "steal"], correctIndex: 1 },
  { id: 17, text: "It's high time you _____ a job.", options: ["find", "found", "finding", "will find"], correctIndex: 1 },
  { id: 18, text: "Hardly _____ when the phone rang.", options: ["I had arrived", "had I arrived", "I arrived", "did I arrive"], correctIndex: 1 },
  { id: 19, text: "She is _____ than her brother.", options: ["tall", "taller", "tallest", "more tall"], correctIndex: 1 },
  { id: 20, text: "I have _____ friends in London.", options: ["a few", "a little", "much", "any"], correctIndex: 0 },
  { id: 21, text: "Let's go to the beach, _____?", options: ["don't we", "shall we", "will we", "let we"], correctIndex: 1 },
  { id: 22, text: "He _____ have missed the train, he left early.", options: ["mustn't", "can't", "shouldn't", "mightn't"], correctIndex: 1 },
  { id: 23, text: "The car _____ needs repairing is mine.", options: ["who", "whom", "which", "whose"], correctIndex: 2 },
  { id: 24, text: "I'd rather you _____ do that.", options: ["don't", "didn't", "won't", "not"], correctIndex: 1 },
  { id: 25, text: "She suggested _____ for a walk.", options: ["to go", "going", "go", "we going"], correctIndex: 1 },
  { id: 26, text: "I will call you as soon as I _____.", options: ["will arrive", "arrive", "arrived", "am arriving"], correctIndex: 1 },
  { id: 27, text: "He is interested _____ learning Spanish.", options: ["in", "on", "at", "about"], correctIndex: 0 },
  { id: 28, text: "They made him _____ the truth.", options: ["tell", "to tell", "telling", "told"], correctIndex: 0 },
  { id: 29, text: "I _____ my hair cut tomorrow.", options: ["am having", "have", "will to have", "having"], correctIndex: 0 },
  { id: 30, text: "Not only _____ late, but he also forgot his books.", options: ["he was", "was he", "he is", "is he"], correctIndex: 1 },
  { id: 31, text: "Do you mind _____ the window?", options: ["to close", "close", "closing", "closed"], correctIndex: 2 },
  { id: 32, text: "I've been working here _____ 2015.", options: ["for", "since", "during", "in"], correctIndex: 1 },
  { id: 33, text: "He speaks English _____ well.", options: ["very", "too", "enough", "much"], correctIndex: 0 },
  { id: 34, text: "If it rains, we _____ at home.", options: ["would stay", "will stay", "stayed", "stay"], correctIndex: 1 },
  { id: 35, text: "She is good _____ playing tennis.", options: ["in", "at", "on", "with"], correctIndex: 1 },
  { id: 36, text: "I _____ prefer tea to coffee.", options: ["would", "had", "do", "am"], correctIndex: 0 },
  { id: 37, text: "The news _____ bad.", options: ["are", "is", "were", "have been"], correctIndex: 1 },
  { id: 38, text: "He told me that he _____ tired.", options: ["is", "was", "has been", "will be"], correctIndex: 1 },
  { id: 39, text: "I can't afford _____ a new car.", options: ["buying", "to buy", "buy", "bought"], correctIndex: 1 },
  { id: 40, text: "She _____ to be a doctor.", options: ["wants", "want", "is wanting", "wants to"], correctIndex: 0 },
  { id: 41, text: "I _____ seen that movie yet.", options: ["didn't", "haven't", "don't", "am not"], correctIndex: 1 },
  { id: 42, text: "He is _____ honest man.", options: ["a", "an", "the", "some"], correctIndex: 1 },
  { id: 43, text: "They _____ playing football when it started to rain.", options: ["are", "were", "have been", "had been"], correctIndex: 1 },
  { id: 44, text: "I _____ go to the party tonight.", options: ["might", "can to", "should to", "would to"], correctIndex: 0 },
  { id: 45, text: "She _____ her keys.", options: ["has lost", "lost", "is losing", "loses"], correctIndex: 0 },
  { id: 46, text: "He is the _____ student in the class.", options: ["better", "best", "good", "most good"], correctIndex: 1 },
  { id: 47, text: "I _____ to music every day.", options: ["listen", "am listening", "listened", "have listened"], correctIndex: 0 },
  { id: 48, text: "She _____ a book now.", options: ["reads", "is reading", "read", "has read"], correctIndex: 1 },
  { id: 49, text: "They _____ to Paris next week.", options: ["go", "are going", "went", "have gone"], correctIndex: 1 },
  { id: 50, text: "I _____ my homework already.", options: ["did", "have done", "do", "am doing"], correctIndex: 1 }
];

export function getRandomQuestions(count: number = 10): Question[] {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
