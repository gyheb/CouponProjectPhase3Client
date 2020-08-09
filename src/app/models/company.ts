import { Coupon } from './coupon';

export class Company {

    constructor(
        public companyId:number,
        public name:string,
        public email:string,
        public password:string,
        public coupons:Coupon[]
        ){}
}
