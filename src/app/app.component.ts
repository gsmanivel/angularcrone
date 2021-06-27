import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CronGenComponent, CronOptions } from 'ngx-cron-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cronApp';

  /*Default value -  '0 0 1/1 * *' */
  public cronExpression = '0 0 * * WED';
  public isCronDisabled = false;

  /*CronOption is mandatory input to be passed  else cron editor will throw error because of undefined input*/
  public cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',
    defaultTime: '00:00:00',
    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,
    use24HourTime: true,
    hideSeconds: false,
    cronFlavor: 'standard'
  };

  /* To access child component (cron editor) */
  @ViewChild('cronEditorRef') cronEditorDemo: CronGenComponent;

  /*Parent Form Declaration */
  cronForm: FormControl;
  reactiveForm: FormGroup;


  constructor() { }

  ngOnInit() {

    /* do not change Form control name - 'cronForm' it mapped in cron editor component*/
    this.reactiveForm = new FormGroup({
      cronForm: new FormControl(this.cronExpression)
    });

    this.cronForm = <FormControl>this.reactiveForm.get('cronForm');
  }


  /*Non cron-editor event*/
  checkOnChangeCronEvents() {
    console.log(this.cronEditorDemo.cron, " - cron expression value");
    //console.log(this.cronEditorDemo.state," - to check state values- state are ngmodel properties for editor component like minutes ,day ,week etc..");
  }

  /*Updating custom value*/
  changeCronDisplay() {
    debugger;
    /*It is updating only cron expression not controls of the editor component*/
    this.cronEditorDemo.cron = '0 0 * * MON,TUE';

    /*Logging state values after cron updation */
    console.log(this.cronEditorDemo.state)

    /*It is updating only state values of editor component */
    this.cronEditorDemo.state.weekly.SUN = true;

    /*accessing state value - state value changed but it is not reflecting in controls */
    console.log(this.cronEditorDemo.state.weekly.SUN, "week updation result");

    console.log(this.cronEditorDemo.state, "state value after weekly updation")

    /*logging weekly form from nested child component */
    console.log(this.cronEditorDemo.weeklyForm);


    /* It is working fine by accessing nested child component*/
    this.cronEditorDemo.weeklyForm.get('SUN')?.setValue(true);/*Alternate - Refer controlValueAccessor Concept*/

    /*It is working fine by passing multiple values */

    this.cronEditorDemo.weeklyForm.setValue({
      MON: true, TUE: true, WED: true, THU: true, FRI: false, SAT: false,
      SUN: false, hourType: null, hours: 0, minutes: 0, seconds: 0
    });

  }


  /*To Test Form access*/
  testFormAccess() {

    console.log(this.reactiveForm, "reactiveForm");
    /*To check initial or default value */
    console.log(this.reactiveForm.get('cronForm')?.value, " - cron expression initial value from form");

    /*To Set custom value */
    this.reactiveForm.get('cronForm')?.setValue('0 0 * * MON,TUE');

    console.log(this.reactiveForm.get('cronForm')?.value, " - cron expression custom value from form");
  }


}
