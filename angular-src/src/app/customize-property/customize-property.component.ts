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

  private insurance: any;
  private propertyTaxes: any;
  private utilities: any;
  private averageRent: any;
  private PITI: any;
  private totalIncome: any;
  private totalFixedExpenses: any;
  private totalVariableExpenses: any;
  private HOA: any;
  private capEx: any;
  private smallRepairs: any;
  private vacancy: any;
  private propertyManagement: any;
  private totalVariableExpense: any = 0;
  private totalFixedExpense: any = 0;
  private totalExpenses: any;
  private netOperatingIncome: any;
  private cashOnCashReturn: any;
  private depreciation: any;
  private incomeSavedTaxes: any;
  private cashFlow: any;
  private totalReturnDollars: any;
  private totalReturnPercent: any;

  private balloonPayment: Boolean;
  private property: any;

  private incomeAdded: boolean = false;
  private fixedExpenseAdded: boolean = false;
  private variableExpenseAdded: boolean = false;

  private newIncome: any;
  private newFixedExpense: any;
  private newVariableExpense: any;

  private amortizationPayments: any;
  private appreciation: any;
  private equityBuilt: any;
  private extraIncomes: Array<any> = [];
  private extraFixedExpenses: Array<any> = [];
  private extraVariableExpenses: Array<any> = [];
  private monthlyNumbers: any;

  constructor(private customizePropertyService: CustomizePropertyService, private router: Router) { }

  ngOnInit() {
    if (this.customizePropertyService.customizedPropertyExists) {
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

    this.property.amortizationPayments = {};
    this.property.appreciation = {};
    this.property.equityBuilt = {};
    this.property.monthlyNumbers = {};
    this.property.insuranceNumbers = {};
    this.property.propertyTaxesNumbers = {};
    this.property.averageRentNumbers = {};
    this.property.HOANumbers = {};
    this.property.PITINumbers = {};
    this.property.totalIncomeNumbers = {};
    this.property.totalFixedExpensesNumbers = {};
    this.property.totalVariableExpensesNumbers = {};
    this.property.capExNumbers = {};
    this.property.smallRepairsNumbers = {};
    this.property.vacancyNumbers = {};
    this.property.totalVariableExpenseNumbers = {};
    this.property.totalFixedExpenseNumbers = {};
    this.property.totalExpensesNumbers = {};
    this.property.cashOnCashReturnNumbers = {};
    this.property.incomeSavedTaxesNumbers = {};
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
      this.property.propertyValue = parseFloat(this.property.propertyValue).toFixed(2);
      this.property.propertyValue = parseFloat(this.property.propertyValue);


      this.property.totalEquityBuilt = this.property.propertyValue - this.property.purchasePrice + this.property.downPayment;

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


        payments.push(payPeriod);
        if (currentMonth == 'December' || i == this.property.numberOfPayments) {
          this.property.equityBuilt[currentYear] = this.property.totalEquityBuilt;


          this.property.propertyValue = this.property.propertyValue + (this.property.propertyValue * this.property.propertyAppreciation);
          this.property.propertyValue = parseFloat(this.property.propertyValue).toFixed(2);
          this.property.propertyValue = parseFloat(this.property.propertyValue);


          this.property.totalEquityBuilt += principalPaid + (this.property.propertyValue - this.property.purchasePrice);
          this.property.totalEquityBuilt = parseFloat(this.property.totalEquityBuilt).toFixed(2);
          this.property.totalEquityBuilt = parseFloat(this.property.totalEquityBuilt);


          this.property.appreciation[currentYear] = this.property.propertyValue;
          this.property.amortizationPayments[currentYear] = payments;
          payments = [];
        }

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


      }

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

      let insuranceNumbers = [];
      let propertyTaxNumbers = [];
      let utilitiesNumbers = [];
      let averageRentNumbers = [];
      let pitiNumbers = [];
      let totalIncomeNumbers = [];
      let totalFixedExpensesNumbers = [];
      let hoaNumbers = [];
      let totalVariableExpensesNumbers = [];
      let capExNumbers = [];
      let smallRepairsNumbers = [];
      let vacancyNumbers = [];
      let propertyManagementNumbers = [];
      let totalVariableExpenseNumbers = [];
      let totalFixedExpenseNumbers = [];
      let totalExpensesNumbers = [];
      let netOperatingIncomeNumbers = [];
      let cashOnCashReturnNumbers = [];
      let incomeSavedTaxesNumbers = [];
      let cashFlowNumbers = [];
      let totalReturnDollarsNumbers = [];
      let totalReturnPercentNumbers = [];

      for (let i = 1; i <= this.property.numberOfPayments; i++) {
        // CALCULATE INFLATION FOR EXPENSES
        // AND RENT APPRECIATION
        if (i != 1 && this.property.inflation != 0) {
          this.insurance = this.insurance + (this.insurance * (this.property.inflation/12));
          this.insurance = parseFloat(this.insurance).toFixed(2);
          this.insurance = parseFloat(this.insurance);
          insuranceNumbers.push(this.insurance);


          this.propertyTaxes = this.propertyTaxes + (this.propertyTaxes * (this.property.inflation/12));
          this.propertyTaxes = parseFloat(this.propertyTaxes).toFixed(2);
          this.propertyTaxes = parseFloat(this.propertyTaxes);
          propertyTaxNumbers.push(this.propertyTaxes);


          this.utilities = this.utilities + (this.utilities * (this.property.inflation/12));
          this.utilities = parseFloat(this.utilities).toFixed(2);
          this.utilities = parseFloat(this.utilities);
          utilitiesNumbers.push(this.utilities);


          this.averageRent = this.averageRent + (this.averageRent * (this.property.rentAppreciation/12));
          this.averageRent = parseFloat(this.averageRent).toFixed(2);
          this.averageRent = parseFloat(this.averageRent);
          averageRentNumbers.push(this.averageRent);

          this.HOA = this.HOA + (this.HOA * (this.property.inflation/12));
          this.HOA = parseFloat(this.HOA).toFixed(2);
          this.HOA = parseFloat(this.HOA);
          hoaNumbers.push(this.HOA);

        } else {
          this.insurance = this.property.insurance;
          this.insurance = parseFloat(this.insurance).toFixed(2);
          this.insurance = parseFloat(this.insurance);

          this.propertyTaxes = this.property.propertyTaxes;
          this.propertyTaxes = parseFloat(this.propertyTaxes).toFixed(2);
          this.propertyTaxes = parseFloat(this.propertyTaxes);

          this.utilities = this.property.utilities;
          this.utilities = parseFloat(this.utilities).toFixed(2);
          this.utilities = parseFloat(this.utilities);

          this.averageRent = this.property.averageRent;
          this.averageRent = parseFloat(this.averageRent).toFixed(2);
          this.averageRent = parseFloat(this.averageRent);

          this.HOA = this.property.HOA;

          insuranceNumbers.push(this.insurance);
          propertyTaxNumbers.push(this.propertyTaxes);
          utilitiesNumbers.push(this.utilities);
          averageRentNumbers.push(this.averageRent);
          hoaNumbers.push(this.HOA);
        }


        this.PITI = this.property.monthlyPayment + this.insurance + this.propertyTaxes;
        this.PITI = parseFloat(this.PITI).toFixed(2);
        this.PITI = parseFloat(this.PITI);
        pitiNumbers.push(this.PITI);

        this.totalIncome = 0;
        if (this.incomeAdded) {
          this.property.extraIncomes.forEach((income) => {
            this.totalIncome += income.incomeAmount;
          });
        }
        this.totalIncome += this.averageRent;
        totalIncomeNumbers.push(this.totalIncome);

        this.totalFixedExpenses = 0;
        if (this.fixedExpenseAdded) {
          this.property.extraFixedExpenses.forEach((expense) => {
            this.totalFixedExpenses += expense.expenseAmount;
          });
        }
        totalFixedExpensesNumbers.push(this.totalFixedExpenses);
        this.totalFixedExpense = this.propertyTaxes + this.insurance + this.HOA + this.utilities;
        totalFixedExpenseNumbers.push(this.totalFixedExpense);

        this.totalVariableExpenses = 0;
        if (this.variableExpenseAdded) {
          this.property.extraVariableExpenses.forEach((expense) => {
            this.totalVariableExpenses += expense.expenseAmount;
          });
        }
        totalVariableExpensesNumbers.push(this.totalVariableExpenses);

        this.capEx = this.property.capEx * this.averageRent;
        this.capEx = Number.parseFloat(this.capEx).toFixed(2);
        this.capEx = parseFloat(this.capEx);
        capExNumbers.push(this.capEx);


        this.smallRepairs = this.property.smallRepairs * this.averageRent;
        this.smallRepairs = Number.parseFloat(this.smallRepairs).toFixed(2);
        this.smallRepairs = parseFloat(this.smallRepairs);
        smallRepairsNumbers.push(this.smallRepairs);

        this.vacancy = this.property.vacancy * this.averageRent;
        this.vacancy = Number.parseFloat(this.vacancy).toFixed(2);
        this.vacancy = parseFloat(this.vacancy);
        vacancyNumbers.push(this.vacancy);

        this.propertyManagement = this.property.propertyManagement * this.averageRent;
        this.propertyManagement = Number.parseFloat(this.propertyManagement).toFixed(2);
        this.propertyManagement = parseFloat(this.propertyManagement);
        propertyManagementNumbers.push(this.propertyManagement);


        this.totalVariableExpense = (this.vacancy) +
                                     (this.propertyManagement) +
                                     (this.capEx) +
                                     (this.smallRepairs);
        totalVariableExpenseNumbers.push(this.totalVariableExpense);


        this.totalExpenses = this.PITI + this.totalFixedExpense + this.totalVariableExpense;
        totalExpensesNumbers.push(this.totalExpenses);

        this.netOperatingIncome = (this.totalIncome - this.totalExpenses) * 12;
        netOperatingIncomeNumbers.push(this.netOperatingIncome);


        this.cashOnCashReturn = (this.netOperatingIncome / this.property.downPayment) * 100;
        this.cashOnCashReturn = Number.parseFloat(this.cashOnCashReturn).toFixed(2);
        this.cashOnCashReturn = parseFloat(this.cashOnCashReturn);
        cashOnCashReturnNumbers.push(this.cashOnCashReturn);


        if (i < 330) {
          this.property.depreciation = this.property.buildingValue / 27.5;
          this.property.depreciation = parseFloat(this.property.depreciation).toFixed(2);
          this.property.depreciation = parseFloat(this.property.depreciation);
        } else {
          this.property.depreciation = 0;
        }


        this.incomeSavedTaxes = this.property.depreciation * this.property.marginalTaxRate;
        this.incomeSavedTaxes = parseFloat(this.incomeSavedTaxes).toFixed(2);
        this.incomeSavedTaxes = parseFloat(this.incomeSavedTaxes);
        incomeSavedTaxesNumbers.push(this.incomeSavedTaxes);


        this.cashFlow = this.totalIncome - this.totalExpenses;
        cashFlowNumbers.push(this.cashFlow);


        this.totalReturnDollars = this.cashFlow + this.property.equityBuilt[currentYear] + this.property.depreciation +
                                    this.incomeSavedTaxes + this.property.appreciation[currentYear];
        totalReturnDollarsNumbers.push(this.totalReturnDollars);


        this.totalReturnPercent = this.totalReturnDollars / (this.property.downPayment + this.property.closingCosts);
        this.totalReturnPercent = Number.parseFloat(this.totalReturnPercent).toFixed(2);
        this.totalReturnPercent = parseFloat(this.totalReturnPercent);
        totalReturnPercentNumbers.push(this.totalReturnPercent);


        let monthlyNums = {
          month: currentMonth,
          year: currentYear,
          averageRent: this.averageRent,
          cashFlow: this.cashFlow,
          depreciation: this.property.depreciation,
          incomeSavedTaxes: this.incomeSavedTaxes,
          totalReturn: this.totalReturnPercent
        }


        numbers.push(monthlyNums);

        if (i % 12 == 0 || i == this.property.numberOfPayments) {
          this.property.monthlyNumbers[currentYear] = numbers;
          this.property.insuranceNumbers[currentYear] = insuranceNumbers;
          this.property.propertyTaxesNumbers[currentYear] = propertyTaxNumbers;
          this.property.averageRentNumbers[currentYear] = averageRentNumbers;
          this.property.HOANumbers[currentYear] = hoaNumbers;
          this.property.PITINumbers[currentYear] = pitiNumbers;
          this.property.totalIncomeNumbers[currentYear] = totalIncomeNumbers;
          this.property.totalFixedExpensesNumbers[currentYear] = totalFixedExpensesNumbers;
          this.property.totalVariableExpensesNumbers[currentYear] = totalVariableExpensesNumbers;
          this.property.capExNumbers[currentYear] = capExNumbers;
          this.property.smallRepairsNumbers[currentYear] = smallRepairsNumbers;
          this.property.vacancyNumbers[currentYear] = vacancyNumbers;
          this.property.totalVariableExpenseNumbers[currentYear] = totalVariableExpenseNumbers;
          this.property.totalFixedExpenseNumbers[currentYear] = totalFixedExpenseNumbers;
          this.property.totalExpensesNumbers[currentYear] = totalExpensesNumbers;
          this.property.cashOnCashReturnNumbers[currentYear] = cashOnCashReturnNumbers;
          this.property.incomeSavedTaxesNumbers[currentYear] = incomeSavedTaxesNumbers;

          numbers = [];
          insuranceNumbers = [];
          propertyTaxNumbers = [];
          averageRentNumbers = [];
          pitiNumbers = [];
          hoaNumbers = [];
          totalIncomeNumbers = [];
          totalFixedExpenseNumbers = [];
          totalFixedExpensesNumbers = [];
          totalVariableExpenseNumbers = [];
          totalVariableExpensesNumbers = [];
          totalExpensesNumbers = [];
          capExNumbers = [];
          smallRepairsNumbers = [];
          vacancyNumbers = [];
          cashOnCashReturnNumbers = [];
          incomeSavedTaxesNumbers = [];
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

      resolve();
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
