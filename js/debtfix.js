function loanRequest(){
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var gender = "";
    if (document.getElementById("male").selected){
        gender = "Male";
    }else {
        gender = "Female";
    }
    var income = "";
    if (document.getElementById("less1000").selected){
        income = "Less than $1,000";
    }else if (document.getElementById("i1000to2000").selected){
        income = "$1,000 to $2,000";
    }else if (document.getElementById("i2000to3000").selected){
        income = "$2,000 to $3,000";
    }else {
        income = "More than $3,000"
    }
    var loan = document.getElementById("loanSize").value;
    var credit = document.getElementById("creditScore").value;
    var message = "Thank You! Your Loan Application has been Sent."
    var report = "Loan application: " + "<br>" + firstname +", " + lastname + "<br>" + "Gender: "+ gender + "<br>" + email + "<br>" + "Monthly Income: " + income + "<br>" + "Credit Score: " + credit + "<br>" + "Loan Amount: $" + loan;
    console.log(report);
    document.getElementById('outputRequest').innerHTML = message;
}

function calcLoan(){
    var message = ""
    var message2 = ""
    var loanAmount = parseFloat(document.getElementById("loanAmount").value);
    var term = parseFloat(document.getElementById("term").value);
    var apr = parseFloat(document.getElementById("apr").value);
    var perMonth = (apr/12 * loanAmount) / (1 - (Math.pow(1/(1 + (apr/12)), term)));
    var total = perMonth * term;
    var current = parseFloat(document.getElementById("current").value);
    var currentM = parseFloat(document.getElementById("currentM").value);
    var currentT = current * currentM;
    var difference = Math.round(currentT - total);
    perMonth = Math.round(perMonth *100)/100;
    total = Math.round(total);
    message = "Your Monthly payment would be: $" + perMonth + "<br>" + "Total Due: $" + total;
    message2 = "Your Total Savings would be: $" + difference;
    document.getElementById('outputCalc').innerHTML = message + "<br>" + message2;
}

$('#send').on('click', function(){
    $('#contact').hide();
    $('p').hide();
    $('#sentMessage').text("Thank you, your message has been sent! We will get back to you shortly.")
})

$.getJSON("/js/debtfix.json", function(data){
    console.log(data);
    var title = data.contactUs.title;
    var phrase = data.contactUs.frase;
    var firstName = data.contactUs.name;
    var prompt = data.contactUs.prompt;
    var atitle = data.aboutUs.title;
    var content = data.aboutUs.content;
    var pride = data.aboutUs.pride;
    $('#firstName').text(firstName);
    $('#prompt').text(prompt);
    $('#CUtitle').text(title);
    $('#phrase').text(phrase);
    $('#aboutTitle').text(atitle);
    $('#aboutContent').text(content);
    $('#pride').text(pride);
})

