//1. 박스 2개만들기
//2. 드랍다운 리스트 만들기
//3. 환율정보들고오기
//4. 드랍다운 리스트에서 아이템 서낵하면 아이템이 바뀜
//5. 금액을 입력하면 환전이된다.
//6. 드랍다운 기준으로 아이ㅔㅁ을 선택하면 다시 그 단위기준으로 환전이됨
//7. 숫자를 한국어로 읽는법
//8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다.

let currencyRatio={
    USD:{
        KRW:1417.58,
        USD:1,
        VND:23875.00,
        unit:"달러"
    },
    KRW:{
        KRW:1,
        USD:0.00071,
        VND:16.84,
        unit:"원"
    },
    VND:{
        KRW:0.059,
        USD:0.000042, 
        VND:1,
        unit:"동"
    }
}
var unitWords = ["", "만", "억", "조", "경"]; 
var splitUnit = 10000;
let fromCurrency = "USD";
let toCurrency = "USD";





// console.log(currencyRatio.USD.unit);
// console.log(currencyRatio["VND"]["unit"]);대괄호랑 .이랑 믹스해도된다.
document.querySelectorAll("#from-currency-list a").forEach((menu)=>menu.addEventListener("click",function(){
    //1.버튼을 가져온다.
    //2. 버튼의값을 바꾼다.
    document.getElementById("from-button").innerHTML=this.innerHTML;
    //3. 선택된 currency값을 변수에 저장해준다.
    fromCurrency = this.textContent;
    // console.log("fromcurrency는 ",fromCurrency);
    convert();
}));

document.querySelectorAll("#to-currency-list a").forEach((menu)=>menu.addEventListener("click",function(){
    document.getElementById("to-button").innerHTML=this.innerHTML;
    toCurrency = this.textContent;
    convert();
}));

//1. 키를 입력한 순간 2.환전되서 3.실시간으로보임

function convert(){
    //1. 환전
    //얼마? 가지고있는돈이 뭔지, 바꾸고자하는 돈이 뭐지
    //돈 * 환율 = 환전금액

    let amount = document.getElementById("from-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    console.log("환전 결과는 ", convertedAmount);

    document.getElementById("to-input").value=convertedAmount;
    readNumKorean();
}

function reconvert(){
    let amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

    document.getElementById("from-input").value=convertedAmount;

}

function readNumKorean(){
    document.getElementById("fromNumToKorea").textContent=
    readNum(document.getElementById("from-input").value)+
    currencyRatio[fromCurrency].unit;

    document.getElementById("toNumToKorea").textContent=
    readNum(document.getElementById("to-input").value)+
    currencyRatio[toCurrency].unit
}

// 숫자단위
function readNum(num){
    let resultString = "";
    let resultArray  = [];

    // 만단위로끊어내는 for문
    for(let i=0;i<unitWords.length;i++){
        let unitResult=(num%Math.pow(splitUnit, i+1))/Math.pow(splitUnit, i);
        unitResult=Math.floor(unitResult);
        if(unitResult>0){
            resultArray[i] = unitResult;
        }
    }

    for(let i=0;i<resultArray.length;i++){
        if(!resultArray[i]) continue;
        resultString=String(resultArray[i])+unitWords[i]+resultString;
    }
    return resultString;
}


// function readNum(num) {
//     let resultString = "";
//     let resultArray = [];
//     for (let i = 0; i < unitWords.length; i++) {
//       let unitResult =
//         (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
//       unitResult = Math.floor(unitResult);
//       if (unitResult > 0) {
//         resultArray[i] = unitResult;
//       }
//     }
//     for (let i = 0; i < resultArray.length; i++) {
//       if (!resultArray[i]) continue;
//       resultString = String(resultArray[i]) + unitWords[i] + resultString;
//     }
//     return resultString;
//   }