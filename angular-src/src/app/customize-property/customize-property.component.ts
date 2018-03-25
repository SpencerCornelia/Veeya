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

  private newIncome: any;
  private newFixedExpense: any;
  private newVariableExpense: any;

  private amortizationPayments: any;
  private extraIncomes: Array<any> = [];
  private extraFixedExpenses: Array<any> = [];
  private extraVariableExpenses: Array<any> = [];

  constructor(private customizePropertyService: CustomizePropertyService) { }

  ngOnInit() {
    this.customizePropertyService.getProperty()
      .subscribe((response) => {
        //this.property = response;
      })

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
        "afterRepairValue": "500000",
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
        "amortizationSchedule": "1",
        "balloonPayment": "No",
        "balloonPaymentYear": "1",
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
    $("#variableExpenseModal").modal('hide');
  }

  cleanseData() {
    return new Promise((resolve, reject) => {

      if (this.property.averageRent) {
        this.property.averageRent = this.property.averageRent.replace("$", "");
        this.property.averageRent = this.property.averageRent.replace(",", "");
        this.property.averageRent = this.property.averageRent.replace(" ", "");
        this.property.averageRent = parseInt(this.property.averageRent);
      } else {
        this.property.averageRent = 0;
      }

      if (this.extraIncomes.length > 0) {
        this.extraIncomes.forEach((income, index) => {
          income["incomeAmount"] = income["incomeAmount"].replace("$", "");
          income["incomeAmount"] = income["incomeAmount"].replace(",", "");
          income["incomeAmount"] = income["incomeAmount"].replace(" ", "");
          this.extraIncomes[index] = {
            incomeName: income["incomeName"],
            incomeAmount: parseInt(income["incomeAmount"])
          }
        });
        this.property.extraIncomes = this.extraIncomes;
      } else {
        this.property.extraIncomes = {};
      }

      if (this.property.expectedRehab) {
        this.property.expectedRehab = this.property.expectedRehab.replace("$", "");
        this.property.expectedRehab = this.property.expectedRehab.replace(",", "");
        this.property.expectedRehab = this.property.expectedRehab.replace(" ", "");
        this.property.expectedRehab = parseInt(this.property.expectedRehab);
      } else {
        this.property.expectedRehab = 0;
      }

      if (this.property.propertyTaxes) {
        this.property.propertyTaxes = this.property.propertyTaxes.replace("$", "");
        this.property.propertyTaxes = this.property.propertyTaxes.replace(",", "");
        this.property.propertyTaxes = this.property.propertyTaxes.replace(" ", "");
        this.property.propertyTaxes = parseInt(this.property.propertyTaxes);
      } else {
        this.property.propertyTaxes = 0;
      }

      if (this.property.insurance) {
        this.property.insurance = this.property.insurance.replace("$", "");
        this.property.insurance = this.property.insurance.replace(",", "");
        this.property.insurance = this.property.insurance.replace(" ", "")
        this.property.insurance = parseInt(this.property.insurance);
      } else {
        this.property.insurance = 0;
      }

      if (this.property.HOA) {
        this.property.HOA = this.property.HOA.replace("$", "");
        this.property.HOA = this.property.HOA.replace(",", "");
        this.property.HOA = this.property.HOA.replace(" ", "");
        this.property.HOA = parseInt(this.property.HOA);
      } else {
        this.property.HOA = 0;
      }

      if (this.property.utilities) {
        this.property.utilities = this.property.utilities.replace("$", "");
        this.property.utilities = this.property.utilities.replace(",", "");
        this.property.utilities = this.property.utilities.replace(" ", "");
        this.property.utilities = parseInt(this.property.utilities);
      } else {
        this.property.utilities = 0;
      }

      if (this.extraFixedExpenses) {
        this.extraFixedExpenses.forEach((expense, index) => {
          expense["expenseAmount"] = expense["expenseAmount"].replace("$", "");
          expense["expenseAmount"] = expense["expenseAmount"].replace(",", "");
          expense["expenseAmount"] = expense["expenseAmount"].replace(" ", "");
          this.extraFixedExpenses[index] = {
            expenseName: expense["expenseName"],
            expenseAmount: parseInt(expense["expenseAmount"])
          }
        });
        this.property.extraFixedExpenses = this.extraFixedExpenses;
      } else {
        this.property.extraFixedExpenses = {};
      }

      if (this.property.vacancy) {
        this.property.vacancy = this.property.vacancy.replace("$", "");
        this.property.vacancy = this.property.vacancy.replace(",", "");
        this.property.vacancy = this.property.vacancy.replace("%", "");
        this.property.vacancy = this.property.vacancy.replace(" ", "");
        this.property.vacancy = parseFloat(this.property.vacancy);
        this.property.vacancy = this.property.vacancy/100;
      } else {
        this.property.vacancy = 0;
      }

      if (this.property.propertyManagement) {
        this.property.propertyManagement = this.property.propertyManagement.replace("$", "");
        this.property.propertyManagement = this.property.propertyManagement.replace(",", "");
        this.property.propertyManagement = this.property.propertyManagement.replace("%", "");
        this.property.propertyManagement = this.property.propertyManagement.replace(" ", "");
        this.property.propertyManagement = parseFloat(this.property.propertyManagement);
        this.property.propertyManagement = this.property.propertyManagement/100;
      } else {
        this.property.propertyManagement = 0;
      }

      if (this.property.capEx) {
        this.property.capEx = this.property.capEx.replace("$","");
        this.property.capEx = this.property.capEx.replace(",","");
        this.property.capEx = this.property.capEx.replace("%","");
        this.property.capEx = this.property.capEx.replace(" ","");
        this.property.capEx = parseFloat(this.property.capEx);
        this.property.capEx = this.property.capEx/100;
      } else {
        this.property.capEx = 0;
      }

      if (this.property.smallRepairs) {
        this.property.smallRepairs = this.property.smallRepairs.replace("$", "");
        this.property.smallRepairs = this.property.smallRepairs.replace(",", "");
        this.property.smallRepairs = this.property.smallRepairs.replace("%", "");
        this.property.smallRepairs = this.property.smallRepairs.replace(" ", "");
        this.property.smallRepairs = parseFloat(this.property.smallRepairs);
        this.property.smallRepairs = this.property.smallRepairs/100;
      } else {
        this.property.smallRepairs = 0;
      }

      if (this.extraVariableExpenses) {
        this.extraVariableExpenses.forEach((expense, index) => {
          expense["expenseAmount"] = expense["expenseAmount"].replace("$", "");
          expense["expenseAmount"] = expense["expenseAmount"].replace(",", "");
          expense["expenseAmount"] = expense["expenseAmount"].replace("%", "");
          expense["expenseAmount"] = expense["expenseAmount"].replace(" ", "");
          this.extraVariableExpenses[index] = {
            expenseName: expense["expenseName"],
            expenseAmount: parseFloat(expense["expenseAmount"])/100
          }
        });
        this.property.extraVariableExpenses = this.extraVariableExpenses;
      } else {
        this.property.extraVariableExpenses = {};
      }

      if (this.property.purchasePrice) {
        this.property.purchasePrice = this.property.purchasePrice.replace("$", "");
        this.property.purchasePrice = this.property.purchasePrice.replace(",", "");
        this.property.purchasePrice = this.property.purchasePrice.replace(" ", "");
        this.property.purchasePrice = parseInt(this.property.purchasePrice);
      } else {
        this.property.purchasePrice = 0;
      }

      if (this.property.downPayment) {
        this.property.downPayment = this.property.downPayment.replace("$", "");
        this.property.downPayment = this.property.downPayment.replace("%", "");
        this.property.downPayment = this.property.downPayment.replace(" ", "");
        this.property.downPayment = parseInt(this.property.downPayment);
      } else {
        this.property.downPayment = 0;
      }

      if (this.property.amortizationSchedule) {
        this.property.amortizationSchedule = parseInt(this.property.amortizationSchedule);
      } else {
        this.property.amortizationSchedule = 30;
      }

      if (this.property.balloonPayment=="Yes") {
        this.property.balloonPayment = true;
        this.property.balloonPaymentYear = this.property.balloonPaymentYear.replace("$", "");
        this.property.balloonPaymentYear = this.property.balloonPaymentYear.replace(",", "");
        this.property.balloonPaymentYear = this.property.balloonPaymentYear.replace(" ", "");
        this.property.balloonPaymentYear = parseInt(this.property.balloonPaymentYear);
      } else {
        this.property.balloonPayment = false;
        this.property.balloonPaymentYear = false;
      }

      if (this.property.interestRate) {
        this.property.interestRate = this.property.interestRate.replace("$", "");
        this.property.interestRate = this.property.interestRate.replace(",", "");
        this.property.interestRate = this.property.interestRate.replace("%", "");
        this.property.interestRate = this.property.interestRate.replace(" ", "");
        this.property.interestRate = parseFloat(this.property.interestRate);
        this.property.interestRate = this.property.interestRate/100;
      } else {
        this.property.interestRate = 0;
      }

      if (this.property.closingCosts) {
        this.property.closingCosts = this.property.closingCosts.replace("$", "");
        this.property.closingCosts = this.property.closingCosts.replace("%", "");
        this.property.closingCosts = this.property.closingCosts.replace(",", "");
        this.property.closingCosts = this.property.closingCosts.replace(" ", "");
        this.property.closingCosts = parseInt(this.property.closingCosts);
      } else {
        this.property.closingCosts = 0;
      }

      if (this.property.PMI) {
        this.property.PMI = this.property.PMI.replace("$", "");
        this.property.PMI = this.property.PMI.replace("%", "");
        this.property.PMI = this.property.PMI.replace(",", "");
        this.property.PMI = this.property.PMI.replace(" ", "");
        this.property.PMI = parseInt(this.property.PMI);
      }

      if (this.property.afterRepairValue) {
        this.property.afterRepairValue = this.property.afterRepairValue.replace("$", "");
        this.property.afterRepairValue = this.property.afterRepairValue.replace("%", "");
        this.property.afterRepairValue = this.property.afterRepairValue.replace(",", "");
        this.property.afterRepairValue = this.property.afterRepairValue.replace(" ", "");
        this.property.afterRepairValue = parseInt(this.property.afterRepairValue);
      } else {
        this.property.afterRepairValue = this.property.purchasePrice || 0;
      }

      if (this.property.rentAppreciation) {
        this.property.rentAppreciation = this.property.rentAppreciation.replace("$", "");
        this.property.rentAppreciation = this.property.rentAppreciation.replace("%", "");
        this.property.rentAppreciation = this.property.rentAppreciation.replace(",", "");
        this.property.rentAppreciation = this.property.rentAppreciation.replace(" ", "");
        this.property.rentAppreciation = parseFloat(this.property.rentAppreciation);
        this.property.rentAppreciation = this.property.rentAppreciation/100;
      } else {
        this.property.rentAppreciation = 0;
      }

      if (this.property.propertyAppreciation) {
        this.property.propertyAppreciation = this.property.propertyAppreciation.replace("$", "");
        this.property.propertyAppreciation = this.property.propertyAppreciation.replace("%", "");
        this.property.propertyAppreciation = this.property.propertyAppreciation.replace(",", "");
        this.property.propertyAppreciation = this.property.propertyAppreciation.replace(" ", "");
        this.property.propertyAppreciation = parseFloat(this.property.propertyAppreciation);
        this.property.propertyAppreciation = this.property.propertyAppreciation/100;
      } else {
        this.property.propertyAppreciation = 0;
      }

      if (this.property.buildingValue) {
        this.property.buildingValue = this.property.buildingValue.replace("$", "");
        this.property.buildingValue = this.property.buildingValue.replace("%", "");
        this.property.buildingValue = this.property.buildingValue.replace(",", "");
        this.property.buildingValue = this.property.buildingValue.replace(" ", "");
        this.property.buildingValue = parseInt(this.property.buildingValue);
      } else {
        this.property.buildingValue = this.property.purchasePrice || 0;
      }

      if (this.property.marginalTaxRate) {
        this.property.marginalTaxRate = this.property.marginalTaxRate.replace("$", "");
        this.property.marginalTaxRate = this.property.marginalTaxRate.replace(",", "");
        this.property.marginalTaxRate = this.property.marginalTaxRate.replace(" ", "");
        this.property.marginalTaxRate = parseFloat(this.property.marginalTaxRate);
        this.property.marginalTaxRate = this.property.marginalTaxRate/100;
      } else {
        this.property.marginalTaxRate = 0;
      }

      resolve();
    });
  }

  amortization() {
    return new Promise((resolve, reject) => {
      let principal = this.property.purchasePrice - this.property.downPayment;
      let amortization = this.property.amortizationSchedule;
      let loanLength = this.property.balloonPayment ? this.property.balloonPaymentYear : amortization;
      let numberOfPayments = loanLength * 12;
      let rate = this.property.interestRate/12;

      let payments = [];
      let yearCount = 1;

      let totalInterestPaid = 0;
      let totalPrincipalPaid = this.property.downPayment;

      let numerator = rate * principal * (Math.pow(1+rate, numberOfPayments));
      let denominator = (Math.pow(1+rate, numberOfPayments) - 1);
      let payment = numerator / denominator;

      for (let i = 1; i <= numberOfPayments; i++) {

        let interestPaid = principal * rate;
        totalInterestPaid = totalInterestPaid + interestPaid;
        let principalPaid = payment - interestPaid;
        totalPrincipalPaid = totalPrincipalPaid + principalPaid;

        let payPeriod = {
          payment: payment,
          interestPaid: interestPaid,
          principalPaid: principalPaid,
          totalInterestPaid: totalInterestPaid,
          totalPrincipalPaid: totalPrincipalPaid,
          balance: principal
        }

        principal = principal - payment;
        numberOfPayments = numberOfPayments - 1;

        payments.push(payPeriod);
        if (i % 12 == 0) {
          this.amortizationPayments[yearCount] = payments;
          payments = [];
          yearCount++;
        }
      }

      console.log("this.amortizationPayments:", this.amortizationPayments);

      resolve();
    });
  }

  async generateReport() {
    await this.cleanseData();
    await this.amortization();
    // await this.??();


    // call service to set the property
    // so property will be available
    // in report component
  }

}
