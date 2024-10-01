let conditions = []

for (let i = 0; i < 3; i++) {
    let numb1 = (Math.floor(Math.random() * 10) + 1);
    let numb2 = (Math.floor(Math.random() * 10) + 1);
    let answer = (numb1 + numb2)
    conditions.push({ 'numb1': numb1, 'numb2': numb2, 'answer': answer })
}

console.log(conditions);
