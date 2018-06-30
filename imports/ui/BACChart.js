import React, { Component } from 'react';
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangeDirective, RangesDirective,
    Inject, Annotations, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-circulargauge';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Legend, Category,
    Tooltip, DataLabel, Zoom, Crosshair, LineSeries, Selection, DateTime, ILoadedEventArgs} from '@syncfusion/ej2-react-charts';
import moment from 'moment';

import history from '../routes/history';

class BACChart extends Component {


    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            gaugevalue: .0,
            gender: "Male",
            age: 21,
            weight: 200,
            data: []    
        }

        myvar='';
        timerID='';
        flag=false;

        currentBAC=0;

        chart = new ChartComponent();

    }



    componentWillMount() {

        Meteor.call('profiles.find',(err,res) => {
            this.setState({
                gender: res.gender,
                age: res.age,
                weight: res.weight
            })
        }) 

        Meteor.call('drinks.find',(err,res) => {
            const drinks=res;
            this.setState({ drinks });
            

            //use this to loop through and get drink info
            drinks.forEach( function(drink) {
                // console.log(drink.description);
            })

            

            this.prepareBACChart();

        })

        

        

        

        // var time=new Date();

        // var time1=time.setHours(6);
        // var time2=time.setHours(7);
        // var time3=time.setHours(8);

        // //this code shows how to convert to string and then back to Date
        // time1=JSON.stringify(time1);
        // time2=JSON.stringify(time2);
        // time3=JSON.stringify(time3);
        // time1=new Date(JSON.parse(time1));
        // time2=new Date(JSON.parse(time2));
        // time3=new Date(JSON.parse(time3));

        // this.setState({ data:
        //     [{time: time1, bac:0.05},
        //     {time: time2, bac:0.06},
        //     {time: time3, bac:0.04}]
        // })

        //this is command for adding to array in state
        // this.setState({data: [...this.state.data, {month:"Junk",sales:50}]});
              
    }

    componentDidMount() {
        // this.onStartBACCalc();

        timerID=setInterval(() => this.prepareBACChart(),60000);


    }

    componentWillUnmount() {
        // clearInterval(myvar);
        clearInterval(timerID);
    }


    prepareBACChart() {
        console.log("It is now time to prepare drinks for chart...")

        var time = new Date();
        var drinksessionstart=new Date();
        drinksessionstart.setHours(drinksessionstart.getHours()-8);
        console.log("Drink Session Start is "+drinksessionstart);

        var presenttime=new Date();

        datejson=[{"time":drinksessionstart,"bac":0.0}];

        //timestep is 1 minute, 
        var timestep = 1;

        //reset BAC level
        currentBAC=0.;

        for(time = drinksessionstart; time<presenttime; time.setMinutes(time.getMinutes()+timestep)){
                
            

            for (var drink of this.state.drinks){

                if( drink.date.getYear()==time.getYear()
                    &&drink.date.getMonth()==time.getMonth()
                    &&drink.date.getDate()==time.getDate()
                    &&drink.date.getHours()==time.getHours()
                    &&drink.date.getMinutes()==time.getMinutes()){

                    console.log(drink.description+" has same time at "+drink.date.getHours()+" "+drink.date.getMinutes());
                
                    this.computeBACIncrease(drink);

                    newtime=JSON.stringify(time);
                    newtime=new Date(JSON.parse(newtime));
                
                    // console.log("Push from drink match loop");
                    datejson.push({"time":newtime,"bac":currentBAC})
                   
                
                }

                
            }

            //alcohol getting metabolized by body
            currentBAC=currentBAC-(0.015/60);
            if(currentBAC<0) currentBAC=0;
            
            //for some reason, must convert time to string and then back to Date
            newtime=JSON.stringify(time);
            newtime=new Date(JSON.parse(newtime));

            // console.log("New time is "+newtime);
            datejson.push({"time":newtime,"bac":currentBAC});

        }  //end of time loop
        
        this.setState({ data: datejson})
        chart.refresh();
        
    }

    computeBACIncrease(drink){
        

        var thisdrinkalcohol=drink.volume*29.6*drink.alcohol/100*0.789;
        console.log(thisdrinkalcohol);

        this.state.gender=="Male" ? r=0.68 : r=0.55;
        var bodyweight=this.state.weight/2.205*1000;  //convert weight from lbs to grams
        bacincrease=thisdrinkalcohol/bodyweight/r*100;
        console.log(bacincrease);

        currentBAC=currentBAC+bacincrease;
    }


    onStartBACCalc(e) {

        const self=this;

        
        
        var drinksessioncutoff= new Date();
        drinksessioncutoff.setHours(drinksessioncutoff.getHours()-8);

        var presenttime=new Date();

        //timestep is 1 minute, 
        var timestep = 1;

        //play with json array and adding items...
        datejson=[{"date":drinksessioncutoff,"bac":0.0}];

        flag ? (clearInterval(myvar), flag=false) :  myvar = Meteor.setInterval(function () {
            flag=true;

            var time = new Date();
            var drinksessionstart=new Date();
            drinksessionstart.setHours(drinksessionstart.getHours()-8);
            console.log("Drink Session Start is "+drinksessionstart);

            

            for(time = drinksessionstart; time<presenttime; time.setMinutes(time.getMinutes()+timestep)){
                
                for (var drink of self.state.drinks){

                    if( drink.date.getYear()==time.getYear()
                        &&drink.date.getMonth()==time.getMonth()
                        &&drink.date.getDate()==time.getDate()
                        &&drink.date.getHours()==time.getHours()
                        &&drink.date.getMinutes()==time.getMinutes()){
                        console.log(drink.description+" has same time at "+drink.date.getHours()+" "+drink.date.getMinutes());
                    
                        
                        //make a change...
                
                        // var newtime = time;
                        // newtime = JSON.stringify(newtime);
                        // datejson.push({"date":newtime,"bac":0.05});
                    
                        datejson.push({"date":time,"bac":0.05})
                       
                    
                    }else {
                        console.log("No drink has matching hour");

                        // var newtime = time;
                        // newtime = JSON.stringify(newtime);
                        // datejson.push({"date":newtime,"bac":0.0});
                        
                        //for some reason, must convert time to string and then back to Date
                        time=JSON.stringify(time);
                        time=new Date(JSON.parse(time));

                        datejson.push({"date":time,"bac":0.0});
                    }

                    
                }

                



            }

            console.log(datejson);

            self.setState({ data: datejson})



            var time=new Date();

            var time1=time.setHours(6);
            var time2=time.setHours(7);
            var time3=time.setHours(8);

            //this code shows how to convert to string and then back to Date
            time1=JSON.stringify(time1);
            time2=JSON.stringify(time2);
            time3=JSON.stringify(time3);
            time1=new Date(JSON.parse(time1));
            time2=new Date(JSON.parse(time2));
            time3=new Date(JSON.parse(time3));

            self.setState({ data:
                [{time: time1, bac:0.01},
                {time: time2, bac:0.02},
                {time: time3, bac:0.03}]
            })

        


            var currenttime=moment();
            var startdrinking=0;
            var totalalcoholconsumed=0;

            //calculate alcohol consumed (grams)
            // grams = oz * 29.6 ml/oz * alcohol/100 * 0.789 (spec gravity)
 

            self.state.drinks.forEach( function(drink) {
                var m=moment();
                var day=drink.day;
                var month=drink.month;
                var year=drink.year;
                var hour=drink.hour;
                var minute=drink.minute;
                m.set({date:day,month:month,year:year,hour:hour,minute:minute})
                
                //hours ago
                var timelapsed=moment.duration(currenttime-m)/1000/60/60;
                var thisdrinkalcohol=drink.volume*29.6*drink.alcohol/100*0.789
                

                //eliminate drinks that were drank more than 8 hours ago...
                if(timelapsed>8){
                    timelapsed=0;
                    thisdrinkalcohol=0;
                }
                    

                if(timelapsed>startdrinking)
                    startdrinking=timelapsed;

                totalalcoholconsumed+=thisdrinkalcohol;

                //duration in minutes...
                console.log("Time since in minutes "+moment.duration(currenttime-m)/1000/60);

            }) 

            console.log("Time since started drinking in hours "+startdrinking);
            console.log("Total alchohol consumed is "+totalalcoholconsumed+" grams");

            //bac=alcohol(grams)/(body weight(grams)*r)*100
            //r=0.55 females and 0.68 for males

            self.state.gender=="Male" ? r=0.68 : r=0.55;
            
            var bodyweight=self.state.weight/2.205*1000;  //convert weight from lbs to grams
            bac=totalalcoholconsumed/bodyweight/r*100-0.015*startdrinking;
            console.log("Bac is " +bac);

            self.setState({ 
                gaugevalue: bac
            })

        }, 10000)

    }


    handleBackButton() {
        clearInterval(myvar);
        history.push('/bacgauge');
    }


    // handleChartRefresh() {

    //     console.log(this.state.data);

    //     chart.title="New BAC Chart";
    //     chart.series[0].dataSource=this.state.data;
    //     chart.series[0].xName='time';
    //     chart.series[0].yName='bac';
    //     chart.primaryXAxis.valueType='DateTime';
    //     // chart.primaryXAxis.title="Drink it up";
    //     chart.refresh();
    //     console.log(chart);
    // }



    render() {
        return (
            <div className="page-content">
                <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                <ChartComponent id='charts' primaryXAxis={ { valueType: 'DateTime'} } 
                    ref={g => chart=g} //this line links chart above to this component!
                    title="BAC vs Time"
                    background='lightgrey'
                    >
                    <Inject services={[ColumnSeries, Tooltip, LineSeries, Legend, Category, DateTime]}></Inject>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource = {this.state.data} xName='time' yName='bac' name='BAC %'>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>

            </div>
        );
    }
}

export default BACChart;
