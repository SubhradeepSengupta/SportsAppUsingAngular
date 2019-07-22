export class Testmodel {
    id : number;
    data : Date;
    noofparticipants : number;
    usertestmapper : object;
    testtypemapper : object;
}

export class TestType {
    id : number;
    name : string;
    testtypemapper : object;
}

export class TestTypeMapperModel {
    id : number;
    testid : number;
    testtypeid : number;
    test : object;
    testtype : object;
}

export class UserTestMapperModel {
    id : number;
    userid : number;
    testid : number;
    coopertestdistance? : number;
    sprinttesttime? : number;
    fitnessrating? : string;
    user : object;
    test : object;
}

export class TestViewModel {
    id : number;
    date : Date;
    testtype : string;
}

export class UserTestViewModel {
    name : string;
    distance? : number;
    time? : number;
}
