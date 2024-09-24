import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// interface IncomeEntry {
//   month: string;
//   income: number;
// }

// interface SubTitle {
//   subTitle: string;
//   incomes: IncomeEntry[];
// }

// interface IncomeData {
//   mainTitles: string;
//   subTitles: SubTitle[];
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'avnon-test';

  data: any[] = [
    {
      mainTitles: {
        title: "Main Title Test",
        info: [
          { month: "Tháng 1", income: 100 },
          { month: "Tháng 2", income: 50 },
          { month: "Tháng 3", income: 100 },
        ],
        subTitles: [
          {
            title: "Subtitle 1",
            info: [
              { month: "Tháng 1", income: 110 },
              { month: "Tháng 2", income: 100 },
              { month: "Tháng 3", income: 110 },
            ],
          },
          {
            title: "Subtitle 1",
            info: [
              { month: "Tháng 1", income: 110 },
              { month: "Tháng 2", income: 110 },
              { month: "Tháng 3", income: 200 },
            ],
          },
        ]
      },
    },

  ];

  calculateMonthlyTotals(mainTitle: any) {
    if (!mainTitle) return [];

    const monthlyTotals = Array(mainTitle.info.length).fill(0);

    mainTitle.info.forEach((info: any, index: number) => {
      monthlyTotals[index] += info.income || 0;
    });

    mainTitle.subTitles.forEach((subTitle: any) => {
      subTitle.info.forEach((info: any, index: number) => {
        monthlyTotals[index] += info.income || 0;
      });
    });

    return monthlyTotals;
  }

  addMainTitle() {
    const currentColumns = this.data.length > 0 ? this.data[0].mainTitles.info.length : 0;

    const newMainTitle = {
        title: `New Title`,
        info: Array.from({ length: currentColumns }, (_, index) => ({
            month: this.data[0].mainTitles.info[index]?.month || `Tháng ${index + 1}`,
            income: 0,
        })),
        subTitles: [] 
    };

    this.data.push({ mainTitles: newMainTitle });
}

  updateIncome(mainIndex: number, subIndex: number, monthIndex: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const income = parseFloat(inputElement.value);
    if (!isNaN(income)) {
      if (subIndex === -1) {
        this.data[mainIndex].mainTitles.info[monthIndex].income = income;
      } else {
        this.data[mainIndex].mainTitles.subTitles[subIndex].info[monthIndex].income = income;
      }
    }
  }

  addSubTitle(mainIndex: number) {

    const currentColumns = this.data[mainIndex].mainTitles.info.length;

    const newSubTitle = {
        title: `New Subtitle`,
        info: Array.from({ length: currentColumns }, (_, index) => ({
            month: this.data[mainIndex].mainTitles.info[index].month,
            income: 0,
        })),
    };
    
    this.data[mainIndex].mainTitles.subTitles.push(newSubTitle);
}

  editSubTitleIndex: { mainIndex: number; subIndex: number } | null = null;

  editSubTitle(mainIndex: number, subIndex: number) {
    this.editSubTitleIndex = { mainIndex, subIndex };
  }

  saveSubTitle(mainIndex: number, subIndex: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newTitle = inputElement.value;
    this.data[mainIndex].mainTitles.subTitles[subIndex].title = newTitle;
    this.editSubTitleIndex = null;
  }

  deleteMainTitle(index: number) {
    this.data.splice(index, 1);
  }

  deleteSubTitle(mainIndex: number, subIndex: number) {
    const subTitles = this.data[mainIndex].mainTitles.subTitles;
    subTitles.splice(subIndex, 1);
  }

  editMainTitleIndex: number | null = null;

  editMainTitle(index: number) {
    this.editMainTitleIndex = index;
  }

  saveMainTitle(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newTitle = inputElement.value;
    this.data[index].mainTitles.title = newTitle;
    this.editMainTitleIndex = null;
  }

  addColumn() {

    const newMonth = `Tháng ${this.data[0].mainTitles.info.length + 1}`;

    this.data.forEach(mainItem => {
      mainItem.mainTitles.info.push({ month: newMonth, income: 0 });

      mainItem.mainTitles.subTitles.forEach((subTitle: { info: { month: string; income: number; }[]; }) => {
        subTitle.info.push({ month: newMonth, income: 0 });
      });
    });
  }
}
