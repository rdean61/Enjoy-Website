import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, TrailingSlashPathLocationStrategy } from '@angular/common';
import { MenuitemService } from '../../services/menuitem'
import { ReviewService } from '../../services/review'
import { isActive } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-admin-reports-dashboard',
  styleUrl: './admin-reports-dashboard.css',
  templateUrl: './admin-reports-dashboard.html',
})
export class AdminReportsDashboard implements OnInit{

  public menuItems: any [] = [];
  public reviews: any [] = [];
  public durationData: any[] = [];

  public Math = Math;

  constructor(private menuitemService: MenuitemService, 
              private reviewService: ReviewService,
              private changeDetectorRef: ChangeDetectorRef
            ) {}

  ngOnInit(): void {

    this.menuitemService.getMenuItems().subscribe({

      next: (data) => {

        this.menuItems = data;
        console.log('Menuitems loaded: ', data);
        this.durationData = this.calcDurationData();
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Integration Error', err);
      }

     });

         this.reviewService.getReview().subscribe({

      next: (data) => {

        this.reviews = data;
        console.log('Reviews loaded:', data);
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Integration Error', err);
      }

    });
  }

  private calcDurationData() {
    const today = new Date();

    const mappedData = this.menuItems.map(item => {

      const ogItemName = item.itemName || item.name;
      const itemName = item.treatType ? `${ogItemName} (${item.treatType})` : ogItemName;

      if(!item.addDate) {
        return { name: itemName, days: 0, isActive: false, treatType: item.treatType };
      }

      const startDate = new Date(item.addDate);
      const removeDate = item.removeDate ? new Date(item.removeData) : null;

      const isActive = !removeDate || startDate > removeDate;

      let endDate = today;
      if (!isActive && item.removeDate) {
        if(!isNaN(removeDate.getTime())) {
          endDate = removeDate;
        }
      }

      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 60  * 60 * 24));

      return {
        name: itemName, 
        days: dayDiff,
        isActive: isActive,
        treatType: item.treatType
      };
    });

    return mappedData.sort((x, y) => {
      if (x.isActive && !y.isActive) return -1;
      if(!x.isActive && y.isActive) return 1;
      return y.days - x.days;
    })
  }

  public getDurationData() {
    if (!this.menuItems || this.menuItems.length === 0) {
      return [];
    }

    const today = new Date();

    const mappedData = this.menuItems.map(item => {
      const ogItemName = item.itemName || item.name;

      const itemName = item.treatType ? `${ogItemName} (${item.treatType})` : ogItemName;

      if(!item.addDate) {
        return { name: itemName, days: 0, isActive: false };
      }

      const  startDate = new Date(item.addDate);

      const isActive = (item.menuOrder || 0) > 0;

      let endDate = today;
      if (!isActive) {
        const removeDate = item.removeDate ? new Date(item.removeDate) : null;
        if(removeDate && !isNaN(removeDate.getTime())) {
          endDate = removeDate;
        }
      }

      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return {
        name: itemName,
        days: dayDiff,
        isActive: isActive
      };
    });

    return mappedData.sort((x, y) => {
      if (x.isActive && !y.isActive) return -1;
      if (!x.isActive && y.isActive) return 1;
      return y.days - x.days;
    });
  }

  public getTreatTypeAvg() {
    const rawData = this.calcDurationData();
    if (!rawData || rawData.length === 0) return [];

    const groupMap: { [key: string]: { totalDays: number; count: number } } = {};

    this.menuItems.forEach((item, index) => {
      const treatType = item.treatType;
      const treatDuration = rawData[index];
      const days = treatDuration ? treatDuration.days : 0;

      if (!groupMap[treatType]) {
        groupMap[treatType] = { totalDays: 0, count: 0 };
      }

      groupMap[treatType].totalDays += days;
      groupMap[treatType].count += 1;
    });

    const averages = Object.keys(groupMap).map(type => {
      const group = groupMap[type];
      const avgDays = Math.round(group.totalDays / group.count);
      return {
        name: type,
        days: avgDays
      };
    });

    return averages.sort((x, y) => y.days - x.days);
  }

  public getEndDays(): number {
    const data = this.getDurationData();

    if (data.length === 0) return 1;

    const end = Math.max(...data.map((d: any) => d.days || 0));
    return end > 0 ? end : 1;

  }

  public getTagAvg() {
    const rawData = this.calcDurationData();
    if (!rawData || rawData.length === 0) return [];

    const groupMap: { [key: string]: { totalDays: number; count: number} } = {};

    this.menuItems.forEach((item, index) => {

      const tagsString = item.itemTags;
      const tags = typeof tagsString === 'string' && tagsString.trim()
        ? tagsString.trim().split(/\s+/) : [];

      const durationItem = rawData[index];
      const days = durationItem ? durationItem.days : 0;

      tags.forEach((tag: string) => {
        if (!groupMap[tag]) {
          groupMap[tag] = { totalDays: 0, count: 0 };
        }
        groupMap[tag].totalDays += days;
        groupMap[tag].count += 1;
      });
    });

    const averages = Object.keys(groupMap).map(tag => {
      const group = groupMap[tag];
      const avgDays = Math.round(group.totalDays / group.count);
      return {
        name: tag,
        days: avgDays
      };
    });

    return averages.sort((x, y) => y.days - x.days);
  }

  public getTagAverageEndDays(): number {
    const data = this.getTagAvg();
    if (data.length === 0) return 1;

    const end = Math.max(...data.map((d: any) => d.days || 0));
    return end > 0 ? end : 1;
  }

}




