function loanRequest(){
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var gender = "";
    if (document.getElementById("male").checked){
        gender = "Male";
    }else {
        gender = "Female";
    }
    var income = "";
    if (document.getElementById("less1000").checked){
        income = "Less than $1,000";
    }else if (document.getElementById("i1000to2000").checked){
        income = "$1,000 to $2,000";
    }else if (document.getElementById("i2000to3000").checked){
        income = "$2,000 to $3,000";
    }else {
        income = "More than $3,000"
    }
    var loan = document.getElementById("loanSize").value;
    var credit = document.getElementById("creditScore").value;
    var message = "Thank You! Your Loan Application has been Sent."
    var report = "Loan application: " + <br> + firstname +", " + lastname + gender + <br> + email + <br> + "Monthly Income: " + income + <br> + "Credit Score: " + credit + <br> + "Loan Amount: " + loan;
    document.getElementById('output').innerHTML;
}

$(document).ready(function() {
    $('#loanRequestB').click(loanRequest());
});

$('#loanRequestB').on("click", function(){
    $('#loanRequest').hide();
})

function calcLoan(){
    var loanAmount = document.getElementById("loanAmount").value;
    var term = document.getElementById("term").value;
    var apr = document.getElementById("apr").value;
    var perMonth = (apr/12 * loanAmount) / Math.pow((1-(1+(apr/12)), -1 * term));
    var total = perMonth * term;
    var display = "Your Monthly payment would be: " + perMonth + <br> + "Total Due: " + total;
    document.getElementById('output').innerHTML;
}
