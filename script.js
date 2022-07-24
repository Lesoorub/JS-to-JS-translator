
var zeroN = "+[]"//0
var oneN = "+!![]"//1
var trueB = "!+[]"//true
var falseB = "!!+[]"//false

var emptyString = "([]+[])";//''

var NaNN = "+{}"//NaN
var _undefined = "[][+[]]"//undefined
var infinity = "+!![]/+[]"//Infinity
var object_objectS = "({}+[])"//'[object Object]'

let map = {};

function GetTenPower(n)
{
    return `+(+(+!![]+[]${Array.from({length: n}, () => "+(+[])").join(" + ")}))`;
}

function number (n) 
{
    if (n === 0) return zeroN;
    if (n === 1) return oneN;
    let nstr = (n + '');
    let result = "";
    for (let k = 0; k < nstr.length; k++)
    {
        let number = +nstr[nstr.length - k - 1];
        for (let i = 0; i < number; i++)
            result += GetTenPower(k)
    }
    return result;
}

function AddToMap(jsfuck_string)
{
    jsfuck_string = `((${jsfuck_string})+[])`
    let str = eval(jsfuck_string);
    for (let k = 0; k < str.length; k++)
    {
        let char = str[k];
        if (map[char] != undefined) continue;

        map[char] = `(${jsfuck_string}[${number(k)}])`
    }
}


AddToMap(object_objectS)
AddToMap(infinity)
AddToMap(_undefined)
AddToMap(NaNN)
AddToMap(trueB)
AddToMap(falseB)

function fromString(s) {
    return "(" + s.split('').map(
        x => 
        {
            if (!(x in map))
            {
                const charCode = x.charCodeAt(0)
                map[x] = `${emptyString}[${constructor}][${fromCharCode}](${number(charCode)})`
            }
            return map[x]
        }).join(" + ") + ")"
}

let constructor = fromString("constructor");

AddToMap(`(${emptyString})[${constructor}]`)
AddToMap(`(/-/)[${constructor}]`)
AddToMap(`(()=>{})[${constructor}]`);

let toStringS = fromString("toString");

AddToMap(`(${number(13)})[${toStringS}](${number(14)})`);
AddToMap(`(${number(17)})[${toStringS}](${number(18)})`);
AddToMap(`(${number(22)})[${toStringS}](${number(23)})`);
map["\\"] = "(/\\\\/+[])[+!![]]";
map["C"] = `(()=>{})[${constructor}](${fromString("return escape")})()(${map["\\"]})[${number(2)}]`

var fromCharCode = fromString("fromCharCode");

var compile = (code) => {
    return `(()=>{})[${constructor}](${fromString(code)})()`
}
