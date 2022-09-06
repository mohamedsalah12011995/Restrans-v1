import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts";
import { DashboardService } from './dashboard.service';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../Shared/Services/auth.service';

declare var $: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(1000, keyframes([
          style({
            opacity: 0.4,
            offset: 0.5
          }),
          style({
            opacity: 1,
            offset: 1
          })
        ]))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
	public datasets: any[];
	public data: any[];
  public salesChart;
  public bestitemSales;
	public clicked: boolean = true;
	public clicked1: boolean = false;
	dataDaily = [
		{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
		{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
		{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
		{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
		{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
		{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
		{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
		{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
		{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
		{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
		{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
		{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
		{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
		{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  	];
	colors :any[] = ['#007bff', '#6610f2', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#6c757d', '#343a40', '#343a40', '#f8f9fa', '#dc3545', '#ffc107', '#17a2b8', '#28a745', '#6c757d', '#007bff', '#e83e8c', '#6f42c1'];
	ItemLabels :any[] = ["شاورما فراخ", "شاورما لحمه", "برجر", "شيش طاووق", "يانية", "شاورما فراخ", "شاورما لحمه", "برجر", "شيش طاووق"];


  dateDay: any;
  pageTitle: string = "";
  currentLang: string = '';

  constructor(private toasterService: ToastWrapperService, private dashboardService: DashboardService, public authService: AuthService,
    private titleService: Title, public translate: TranslateService) {


    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);


  }

  ngOnInit() {




   

		this.datasets = [
			[0, 20, 10, 30, 15, 40, 20, 60, 60],
			[0, 20, 5, 25, 10, 30, 15, 40, 40]
		];
		this.data = this.datasets[0];
		var ChartSales = document.getElementById('chart-sales');
		parseOptions(Chart, chartOptions());
		// ordersChart
		this.salesChart = new Chart(ChartSales, {
			type: 'bar',
			options: {
				legend: {
					display: false,
					position: 'bottom',
					labels: {
						usePointStyle: false,
						defaultFontSize: 8,
						padding: 10
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							callback: function(value) {
								if (!(value % 5)) {
									//return '$' + value + 'k'
									return value;
								}
							}
						}
					}],
					xAxes: [{
						display: true,
						drawBorder: true,
						drawOnChartArea: true,
						drawTicks: true,
						tickMarkLength: 10,
						offsetGridLines: false,
					}]
				},
				tooltips: {
					callbacks: {
						label: function(item, data) {
							var label = data.datasets[item.datasetIndex].label || "";
							var yLabel = item.yLabel;
							var content = "";
							if (data.datasets.length > 1) {
								content += label;
							}
							content += yLabel;
							return content;
						}
					}
				}
			},
			data: {
				labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونية", "يولية", "أغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"],
				datasets: [
					{
						label: "Sales",
						data: this.data
					}
				]
			}
		});

		
		var ChartItems = document.getElementById('chart-Items');
		this.bestitemSales = new Chart(ChartItems, {
			type: 'doughnut',
			data: {
              labels: this.ItemLabels,
				datasets: [
				  {
					label: "الاكثر مبيعا",
					data: [10, 50, 25, 70, 40, 10, 50, 25, 70],
					backgroundColor: this.colors,
					borderColor: this.colors,
					borderWidth: [1, 1, 1, 1, 1]
				  }
				]
			},
			option: {
        styleing: {
          
        },
				legend: {
          fontSize: 15,
          // weight: 100,
				}
			},
    });


    this.GetMonthlySalesDashboardChart();


    this.GetTodayTotals();

    this.GetMonthlyTotals();

    this.GetBestSalesDashboard();

    this.GetBillsCountToday();

    this.GetBillsDeliveryCountToday();
    this.GetDeliveryTabelsBillsCountToday();

 	}
    active() {
        throw new Error("Method not implemented.");
    }



 

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "الصفحة الرئيسية";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Home ";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  isTodayTotalUp: boolean = false;
  TodayProgressRatio: number = 0;
  todayTotal: number = 0;

  public GetTodayTotals() {

    this.dashboardService.GetTodayDashboardTotals().subscribe(result => {

     this.todayTotal = result.todayTotal;

      if (result.todayTotal > result.yasterdayTotal) {
        this.isTodayTotalUp = true;
        this.TodayProgressRatio = (result.todayTotal - result.yasterdayTotal) * 100 / result.todayTotal;

      }
      else {
        this.isTodayTotalUp = false;

        this.TodayProgressRatio = (result.yasterdayTotal - result.todayTotal) * 100 / result.yasterdayTotal;

      }      
    },
      error => {
        console.log("Error", error);
      })


  }




  isMonthlyTotalUp: boolean = false;
  MonthlyProgressRatio: number = 0;
  MonthlyTotal: number = 0;

  public GetMonthlyTotals() {

    this.dashboardService.GetMonthlyDashboardTotals().subscribe(result => {

      this.MonthlyTotal = result.monthlyTotal;

      if (result.monthlyTotal > result.lastMonthTotal) {
        this.isMonthlyTotalUp = true;
        this.MonthlyProgressRatio = (result.monthlyTotal - result.lastMonthTotal) * 100 / result.monthlyTotal;

      }
      else {


        this.isMonthlyTotalUp = false;
        this.MonthlyProgressRatio = (result.lastMonthTotal - result.monthlyTotal) * 100 / result.monthlyTotal;

      }
    },
      error => {
        console.log("Error", error);
      })
  }


  
  public GetMonthlySalesDashboardChart() {

    this.dashboardService.GetMonthlySalesDashboardChart().subscribe((result:any[]) => {
      this.data  = [];
      for (var i = 1; i <= 12; i++) {

      var month=  result.find(x => x.monthl == i, 0);

        if (month == null || month == undefined) {
          this.data.push(0)
        }
        else {
          this.data.push(month.total)


        }


      }
      this.datasets = [];

      this.datasets.push(this.data);
      this.datasets.push(this.data);
      this.salesChart.data.datasets[0].data = this.data;
      this.salesChart.update();



    },
      error => {
        console.log("Error", error);
      })



  }

  bestItemsSeller : []
  public GetBestSalesDashboard() {

    this.dashboardService.GetBestSalesDashboard().subscribe((result: any[]) => {

      this.ItemLabels = result.map(x => x.itemName);
      this.bestitemSales.data.labels = this.ItemLabels;
      this.bestitemSales.data.datasets[0].data = result.map(x => x.totalQty);


      this.bestitemSales.update();



    },
      error => {
        console.log("Error", error);
      })



  }


  BillsCount: number;
  public GetBillsCountToday() {

    this.dashboardService.GetBillsCountToday().subscribe((result: any) => {

      this.BillsCount = result;

    },
      error => {
        console.log("Error", error);
      })
  }

  BillsDeliveryCount: number;
  public GetBillsDeliveryCountToday() {

    this.dashboardService.GetDeliveryBillsCountToday().subscribe((result: any) => {

      this.BillsDeliveryCount = result;

    },
      error => {
        console.log("Error", error);
      })
  }



  BillsTabelCount: number;
  public GetDeliveryTabelsBillsCountToday() {

    this.dashboardService.GetDeliveryTabelsBillsCountToday().subscribe((result: any) => {
   
      this.BillsTabelCount = result;

    },
      error => {
        console.log("Error", error);
      })
  }



	public updateOptions() {
		this.salesChart.data.datasets[0].data = this.data;
		this.salesChart.update();
	}

}
