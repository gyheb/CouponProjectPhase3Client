import { CategoryType } from './category-type';

export class Coupon {

    constructor(
        public couponId:number,
        public type:CategoryType,
        public title:string,
        public description:string,
        public startDate:Date,
        public endDate:Date,
        public amount:number,
        public price:number,
        public image:string
    ){}
}
