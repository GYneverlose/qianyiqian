let luck = 0;
let cards = [];
let rice = 0;
const idioms = [
    ["福", "禄", "寿", "喜"],
    ["安", "居", "乐", "业"],
    ["心", "想", "事", "成"],
    ["吉", "星", "高", "照"],
    ["万", "事", "如", "意"]
];

function startRitual() {
    document.getElementById("ritual-hint").innerText = "……静心中……";
    setTimeout(shakeFortune, 1500);
}

function shakeFortune() {
    const fortunes = [
        { level: "中签", value: 0, text: "水缓山长路自通" },
        { level: "上签", value: 1, text: "微光不负赶路人" },
        { level: "上上签", value: 2, text: "风顺帆稳海天阔" }
    ];
    const result = fortunes[Math.floor(Math.random() * fortunes.length)];
    luck += result.value;
    document.getElementById("result").innerText = `${result.level}：「${result.text}」`;
    document.getElementById("luck-value").innerText = luck;
}

function drawCard() {
    if (luck < 5) {
        alert("命运值不足，需至少5点才能抽卡");
        return;
    }
    luck -= 5;
    const allWords = idioms.flat();
    const word = allWords[Math.floor(Math.random() * allWords.length)];
    cards.push(word);
    document.getElementById("cards").innerText += word + " ";
    document.getElementById("luck-value").innerText = luck;
    update藏经阁();
}

function update藏经阁() {
    const wordCounts = {};
    cards.forEach(w => wordCounts[w] = (wordCounts[w] || 0) + 1);
    document.getElementById("collected-words").innerText = "收集字卡：" + Object.entries(wordCounts).map(([w, c]) => w + "×" + c).join("、");
    
    const 成语集 = [];
    idioms.forEach(idiom => {
        if (idiom.every(w => wordCounts[w])) {
            成语集.push(idiom.join(""));
        }
    });
    document.getElementById("成语-display").innerText = "已拼成语：" + 成语集.join("、");
    rice = 成语集.length;
    document.getElementById("rice-count").innerText = rice;
}