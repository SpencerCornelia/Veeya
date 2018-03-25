import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Property } from '../models/Property';
import { User } from '../models/User';

import { CustomizePropertyService } from '../services/customizeProperty.service';

declare var $: any;

@Component({
  selector: 'app-customize-property',
  templateUrl: './customize-property.component.html',
  styleUrls: ['./customize-property.component.css']
})
export class CustomizePropertyComponent implements OnInit {

  private balloonPayment: Boolean;
  private property: any;

  private incomeAdded: boolean = false;
  private fixedExpenseAdded: boolean = false;
  private variableExpenseAdded: boolean = false;

  private newIncome: any;
  private newFixedExpense: any;
  private newVariableExpense: any;

  private amortizationPayments: any;
  private extraIncomes: Array<any> = [];
  private extraFixedExpenses: Array<any> = [];
  private extraVariableExpenses: Array<any> = [];
  private monthlyNumbers: any;

  constructor(private customizePropertyService: CustomizePropertyService, private router: Router) { }

  ngOnInit() {
    if (this.customizePropertyService.getCustomizedProperty) {
      this.property = this.customizePropertyService.getCustomizedProperty();
    } else {
      this.customizePropertyService.getProperty()
        .subscribe((response) => {
          this.property = response;
        })
    }

    this.property = {
        "_id": "5aaead5fefef19eb2662b924",
        "updated_at": "2018-03-18T18:18:08.000Z",
        "created_at": "2018-03-18T18:18:08.000Z",
        "wholesaler_id": "5aaea4a1ce0c02e9a020ac08",
        "address": "Second Property to Test",
        "city": "Las Vegas",
        "state": "NV",
        "zipCode": "89109",
        "purchasePrice": "240000",
        "bedrooms": 3,
        "bathrooms": 3,
        "expectedRehab": "25000",
        "afterRepairValue": "260000",
        "HOA": "125",
        "propertyTaxes": "100",
        "averageRent": "1900",
        "squareFootage": "1000",
        "propertyType": "Single Family",
        "yearBuilt": "1980",
        "status": "Listed",
        "utilities": "100",
        "insurance": "85",
        "sellerFinancing": "no",
        "amortizationSchedule": "30",
        "balloonPayment": "No",
        "balloonPaymentYear": "5",
        "downPayment": "20000",
        "interestRate": "5",
        "closingCosts": "5000",
        "PMI": "0",
        "inflation": "1",
        "rentAppreciation": "1",
        "propertyAppreciation": "1",
        "buildingValue": "175000",
        "marginalTaxRate": "20",
        "vacancy": "5",
        "propertyManagement": "10",
        "capEx": "10",
        "smallRepairs": "5",
        "__v": 0,
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/veeya-c0185.appspot.com/o/property-photos%2F5aaea4a1ce0c02e9a020ac08%2Froom.jpg?alt=media&token=d3b6dea5-6b5d-414f-8e56-6d1c61bd5166"
        ],
        "comps": [
            {
                "firstCompAddress": "",
                "firstCompPrice": ""
            },
            {
                "secondCompAddress": "",
                "secondCompPrice": ""
            },
            {
                "thirdCompAddress": "",
                "thirdCompPrice": ""
            }
        ]
    };

    this.newIncome = {
      incomeName: '',
      incomeAmount: ''
    }
    this.newFixedExpense = {
      expenseName: '',
      expenseAmount: ''
    }
    this.newVariableExpense = {
      expenseName: '',
      expenseAmount: ''
    }

    this.amortizationPayments = {};
    this.monthlyNumbers = {};
  }

  changeBalloonPayment(value) {
    // change this to property on model
    if (value == 'Yes') {
      this.balloonPayment = true;
    } else {
      this.balloonPayment = false;
    }
  }

  extraIncomeModal() {
    $("#extraIncomeModal").modal('show');
  }

  extraFixedExpenseModal() {
    $("#fixedExpenseModal").modal('show');
  }

  extraVariableExpenseModal() {
    $("#variableExpenseModal").modal('show');
  }

  addExtraIncome() {
    let newIncome = {
      incomeName: "",
      incomeAmount: ""
    };

    newIncome.incomeName = $("#incomeName").val();
    newIncome.incomeAmount = $("#incomeAmount").val();
    this.extraIncomes.push(newIncome);
    this.incomeAdded = true;
    $("#extraIncomeModal").modal('hide');
  }

  addExtraFixedExpense() {
    let newFixedExpense = {
      expenseName: "",
      expenseAmount: ""
    }

    newFixedExpense.expenseName = $("#fixedExpenseName").val();
    newFixedExpense.expenseAmount = $("#fixedExpenseAmount").val();
    this.extraFixedExpenses.push(newFixedExpense);
    this.fixedExpenseAdded = true;
    $("#fixedExpenseModal").modal('hide');
  }

  addExtraVariableExpense() {
    let newVariableExpense = {
      expenseName: "",
      expenseAmount: ""
    }

    newVariableExpense.expenseName = $("#variableExpenseName").val();
    newVariableExpense.expenseAmount = $("#variableExpenseAmount").val();
    this.extraVariableExpenses.push(newVariableExpense);
    this.variableExpenseAdded = true;
    $("#variableExpenseModal").modal('hide');
  }

  cleanseString(string) {
    if (typeof string != 'string') {
      return string;
    }
    string = string.replace("$", "");
    string = string.replace(",", "");
    string = string.replace(" ", "");
    string = string.replace("%", "");
    return string;
  }

  cleanseData() {
    return new Promise((resolve, reject) => {

      this.property.averageRent = this.cleanseString(this.property.averageRent);
      this.property.averageRent = parseInt(this.property.averageRent);


      if (this.extraIncomes.length > 0) {
        this.extraIncomes.forEach((income, index) => {
          income["incomeAmount"] = this.cleanseString(income["incomeAmount"]);
          this.extraIncomes[index] = {
            incomeName: income["incomeName"],
            incomeAmount: parseInt(income["incomeAmount"])
          }
        });
        this.property.extraIncomes = this.extraIncomes;
      } else {
        this.property.extraIncomes = {};
      }


      this.property.expectedRehab = this.cleanseString(this.property.expectedRehab);
      this.property.expectedRehab = parseInt(this.property.expectedRehab);


      this.property.propertyTaxes = this.cleanseString(this.property.propertyTaxes);
      this.property.propertyTaxes = parseInt(this.property.propertyTaxes);


      this.property.insurance = this.cleanseString(this.property.insurance);
      this.property.insurance = parseInt(this.property.insurance);


      this.property.HOA = this.cleanseString(this.property.HOA);
      this.property.HOA = parseInt(this.property.HOA);


      this.property.utilities = this.cleanseString(this.property.utilities);
      this.property.utilities = parseInt(this.property.utilities);


      if (this.extraFixedExpenses) {
        this.extraFixedExpenses.forEach((expense, index) => {
          expense["expenseAmount"] = this.cleanseString(expense["expenseAmount"]);
          this.extraFixedExpenses[index] = {
            expenseName: expense["expenseName"],
            expenseAmount: parseInt(expense["expenseAmount"])
          }
        });
        this.property.extraFixedExpenses = this.extraFixedExpenses;
      } else {
        this.property.extraFixedExpenses = {};
      }


      this.property.vacancy = this.cleanseString(this.property.vacancy);
      this.property.vacancy = parseFloat(this.property.vacancy);
      this.property.vacancy = this.property.vacancy/100;


      this.property.propertyManagement = this.cleanseString(this.property.propertyManagement);
      this.property.propertyManagement = parseFloat(this.property.propertyManagement);
      this.property.propertyManagement = this.property.propertyManagement/100;


      this.property.capEx = this.cleanseString(this.property.capEx);
      this.property.capEx = parseFloat(this.property.capEx);
      this.property.capEx = this.property.capEx/100;


      this.property.smallRepairs = this.cleanseString(this.property.smallRepairs);
      this.property.smallRepairs = parseFloat(this.property.smallRepairs);
      this.property.smallRepairs = this.property.smallRepairs/100;


      if (this.extraVariableExpenses) {
        this.extraVariableExpenses.forEach((expense, index) => {
          expense["expenseAmount"] = this.cleanseString(expense["expenseAmount"]);
          this.extraVariableExpenses[index] = {
            expenseName: expense["expenseName"],
            expenseAmount: parseFloat(expense["expenseAmount"])/100
          }
        });
        this.property.extraVariableExpenses = this.extraVariableExpenses;
      } else {
        this.property.extraVariableExpenses = {};
      }


      this.property.purchasePrice = this.cleanseString(this.property.purchasePrice);
      this.property.purchasePrice = parseInt(this.property.purchasePrice);


      this.property.downPayment = this.cleanseString(this.property.downPayment);
      this.property.downPayment = parseInt(this.property.downPayment);


      this.property.amortizationSchedule = parseInt(this.property.amortizationSchedule);


      if (this.property.balloonPayment=="Yes") {
        this.property.balloonPaymentYear = parseInt(this.property.balloonPaymentYear);
      } else {
        this.property.balloonPaymentYear = false;
      }


      this.property.interestRate = this.cleanseString(this.property.interestRate);
      this.property.interestRate = parseFloat(this.property.interestRate);
      this.property.interestRate = this.property.interestRate/100;


      this.property.closingCosts = this.cleanseString(this.property.closingCosts);
      this.property.closingCosts = parseInt(this.property.closingCosts);


      this.property.PMI = this.cleanseString(this.property.PMI);
      this.property.PMI = parseFloat(this.property.PMI);
      this.property.PMI = this.property.PMI/100;


      this.property.afterRepairValue = this.cleanseString(this.property.afterRepairValue);
      this.property.afterRepairValue = parseInt(this.property.afterRepairValue);


      this.property.inflation = this.cleanseString(this.property.inflation);
      this.property.inflation = parseFloat(this.property.inflation);
      this.property.inflation = this.property.inflation/100;


      this.property.rentAppreciation = this.cleanseString(this.property.rentAppreciation);
      this.property.rentAppreciation = parseFloat(this.property.rentAppreciation);
      this.property.rentAppreciation = this.property.rentAppreciation/100;


      this.property.propertyAppreciation = this.cleanseString(this.property.propertyAppreciation);
      this.property.propertyAppreciation = parseFloat(this.property.propertyAppreciation);
      this.property.propertyAppreciation = this.property.propertyAppreciation/100;


      this.property.buildingValue = this.cleanseString(this.property.buildingValue);
      this.property.buildingValue = parseInt(this.property.buildingValue);


      this.property.marginalTaxRate = this.cleanseString(this.property.marginalTaxRate);
      this.property.marginalTaxRate = parseFloat(this.property.marginalTaxRate);
      this.property.marginalTaxRate = this.property.marginalTaxRate/100;

      resolve();
    });
  }

  amortization() {
    return new Promise((resolve, reject) => {

      this.property.principalLoanAmount = this.property.purchasePrice - this.property.downPayment;
      this.property.loanLength = this.property.balloonPayment=="Yes" ? this.property.balloonPaymentYear : this.property.amortizationSchedule;
      this.property.numberOfPayments = this.property.loanLength * 12;
      let paymentsRemaining = this.property.numberOfPayments;
      let rate = this.property.interestRate/12;

      this.property.propertyValue = this.property.afterRepairValue;
      this.property.equityBuilt = {};
      this.property.totalEquityBuilt = this.property.propertyValue - this.property.purchasePrice + this.property.downPayment;
      this.property.appreciation = {};

      let principalRemaining = this.property.principalLoanAmount;

      let payments = [];
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let newDate = new Date();
      let month = newDate.getMonth();
      let currentMonth = months[month];
      let currentYear = newDate.getFullYear();

      let totalInterestPaid = 0;
      let totalPrincipalPaid = this.property.downPayment;

      let numerator = rate * this.property.principalLoanAmount * (Math.pow(1+rate, this.property.numberOfPayments));
      let denominator = (Math.pow(1+rate, this.property.numberOfPayments) - 1);
      this.property.monthlyPayment = numerator / denominator;

      this.property.PMIAmount = 0;

      for (let i = 1; i <= this.property.numberOfPayments; i++) {

        if (this.property.PMI > 0) {
          this.property.PMIAmount = (this.property.principalLoanAmount * this.property.PMI)/12;
          this.property.monthlyPayment = this.property.monthlyPayment + (this.property.PMIAmount);
          this.property.monthlyPayment = Number.parseFloat(this.property.monthlyPayment).toFixed(2);
          this.property.monthlyPayment = parseFloat(this.property.monthlyPayment);
          let plusAppreciation = this.property.totalEquityBuilt + (this.property.propertyValue * (this.property.propertyAppreciation/12));
          plusAppreciation = Math.round(plusAppreciation);
          if ((plusAppreciation / this.property.propertyValue) > 0.22) {
            this.property.PMI = 0;
          }
        } else {
          this.property.monthlyPayment = numerator / denominator;
          this.property.monthlyPayment = Number.parseFloat(this.property.monthlyPayment).toFixed(2);
          this.property.monthlyPayment = parseFloat(this.property.monthlyPayment);
        }


        let intPaid = principalRemaining * rate;
        let interestString = Number(intPaid).toFixed(2);
        let interestPaid = parseFloat(interestString);
        totalInterestPaid = totalInterestPaid + interestPaid;

        let principalInitial = this.property.monthlyPayment - interestPaid - this.property.PMIAmount;
        let principalString = Number(principalInitial).toFixed(2);
        let principalPaid = parseFloat(principalString);
        totalPrincipalPaid = totalPrincipalPaid + principalPaid;

        let pmiPay = ((this.property.PMI * this.property.principalLoanAmount)/12).toFixed(2);
        let pmiPaid = parseFloat(pmiPay);

        let payPeriod = {
          month: currentMonth,
          year: currentYear,
          payment: this.property.monthlyPayment,
          interestPaid: interestPaid,
          principalPaid: principalPaid,
          pmiPaid: pmiPaid,
          totalInterestPaid: totalInterestPaid,
          totalPrincipalPaid: totalPrincipalPaid,
          balance: principalRemaining
        }


        principalRemaining = principalRemaining - principalPaid;
        paymentsRemaining = paymentsRemaining - 1;

        this.property.totalEquityBuilt += principalPaid;
        if (month == 11) {
          month = 0;
          currentMonth = months[month];
        } else {
          month++;
          currentMonth = months[month];
        }

        if (currentMonth == "January") {
          currentYear++;
        }

        payments.push(payPeriod);
        if (currentMonth == 'December') {
          this.property.equityBuilt[currentYear] = this.property.totalEquityBuilt;
          this.property.propertyValue = this.property.propertyValue + (this.property.propertyValue * this.property.propertyAppreciation);
          this.property.appreciation[currentYear] = this.property.propertyValue;
          this.amortizationPayments[currentYear] = payments;
          payments = [];
        }

      }


      this.property.amortizationPayments = this.amortizationPayments;

      resolve();
    });
  }

  calculations() {
    return new Promise((resolve, reject) => {
      let numbers = [];
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let newDate = new Date();
      let month = newDate.getMonth();
      let currentMonth = months[month];
      let currentYear = newDate.getFullYear();

      for (let i = 1; i <= this.property.numberOfPayments; i++) {
        if (i != 1 && this.property.inflation != 0) {
          this.property.insurance = this.property.insurance + (this.property.insurance * this.property.inflation);
          this.property.propertyTaxes = this.property.propertyTaxes + (this.property.propertyTaxes * this.property.inflation);
          this.property.utilities = this.property.utilities + (this.property.utilities * this.property.inflation);

          this.property.averageRent = this.property.averageRent + (this.property.averageRent * this.property.rentAppreciation);
        }

        this.property.PITI = this.property.monthlyPayment + this.property.insurance + this.property.propertyTaxes;

        this.property.totalIncome = 0;
        if (this.incomeAdded) {
          this.property.extraIncomes.forEach((income) => {
            this.property.totalIncome += income.incomeAmount;
          });
        }
        this.property.totalIncome += this.property.averageRent;


        this.property.totalFixedExpenses = 0;
        if (this.fixedExpenseAdded) {
          this.property.extraFixedExpenses.forEach((expense) => {
            this.property.totalFixedExpenses += expense.expenseAmount;
          });
        }
        this.property.totalFixedExpenses += this.property.propertyTaxes + this.property.insurance + this.property.HOA + this.property.utilities;

        this.property.totalVariableExpenses = 0;
        if (this.variableExpenseAdded) {
          this.property.extraVariableExpenses.forEach((expense) => {
            this.property.totalVariableExpenses += expense.expenseAmount;
          });
        }

        this.property.capExCalc = this.property.capEx * this.property.averageRent;
        this.property.capExCalc = Number.parseFloat(this.property.capExCalc).toFixed(2);
        this.property.smallRepairsCalc = this.property.smallRepairs * this.property.averageRent;
        this.property.smallRepairsCalc = Number.parseFloat(this.property.smallRepairsCalc).toFixed(2);
        this.property.vacancyCalc = this.property.vacancy * this.property.averageRent;
        this.property.vacancyCalc = Number.parseFloat(this.property.vacancyCalc).toFixed(2);
        this.property.propertyManagementCalc = this.property.propertyManagement * this.property.averageRent;
        this.property.propertyManagementCalc = Number.parseFloat(this.property.propertyManagementCalc).toFixed(2);

        this.property.totalVariableExpenses += (this.property.vacancyCalc) +
                                               (this.property.propertyManagementCalc) +
                                               (this.property.capExCalc) +
                                               (this.property.smallRepairsCalc);


        this.property.totalExpenses = this.property.PITI + this.property.totalFixedExpenses + this.property.totalVariableExpenses;
        this.property.netOperatingIncome = (this.property.totalIncome - this.property.totalExpenses) * 12;

        this.property.cashOnCashReturn = (this.property.netOperatingIncome / this.property.downPayment) * 100;
        this.property.cashOnCashReturn = Number.parseFloat(this.property.cashOnCashReturn).toFixed(2);

        if (i < 28) {
          this.property.depreciation = this.property.buildingValue / 27.5;
        } else {
          this.property.depreciation = 0;
        }

        this.property.incomeSavedTaxes = this.property.depreciation * this.property.marginalTaxRate;
        this.property.cashFlow = this.property.totalIncome - this.property.totalExpenses;

        this.property.totalReturnDollars = this.property.cashFlow + this.property.equityBuilt[currentYear] + this.property.depreciation +
                                    this.property.incomeSavedTaxes + this.property.appreciation[currentYear];

        this.property.totalReturnPercent = this.property.totalReturnDollars / (this.property.downPayment + this.property.closingCosts);
        this.property.totalReturnPercent = Number.parseFloat(this.property.totalReturnPercent).toFixed(2);

        let monthlyNums = {
          month: currentMonth,
          year: currentYear,
          cashFlow: this.property.cashFlow,
          depreciation: this.property.depreciation,
          incomeSavedTaxes: this.property.incomeSavedTaxes,
          totalReturn: this.property.totalReturnPercent
        }


        numbers.push(monthlyNums);

        if (i % 12 == 0) {
          this.monthlyNumbers[currentYear] = numbers;
          numbers = [];
          currentYear++;
        }

        if (i % 12 == 0) {
          month = 0;
          currentMonth = months[month];
        } else {
          month++;
          currentMonth = months[month];
        }

      }

      this.property.monthlyNumbers = this.monthlyNumbers;
    });
  }

  async generateReport() {
    this.customizePropertyService.setCustomizedProperty(this.property);

    await this.cleanseData();
    await this.amortization();
    await this.calculations();

    this.customizePropertyService.setProperty(this.property);
    this.router.navigate(['/generateReport/', this.property._id]);
  }

}
