/* tslint:disable:no-console */

import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.less';
import DatePicker from '../src/index';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import moment from 'moment';
import zhCn from '../src/locale/zh_CN';
import enUs from '../src/locale/en_US';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

const minDate = moment([2015, 8, 15, 0, 0, 0]);
const maxDate = moment([2018, 1, 1, 23, 59, 59]);
const now = moment();

if (cn) {
  // minDate.locale('zh-cn').utcOffset(8);
  // maxDate.locale('zh-cn').utcOffset(8);
  now.locale('zh-cn').utcOffset(8);
} else {
  // minDate.locale('en-gb').utcOffset(0);
  // maxDate.locale('en-gb').utcOffset(0);
  now.locale('en-gb').utcOffset(0);
}

function format(date) {
  return date.format('YYYY-MM-DD HH:mm');
}

class Demo extends React.Component<any, any> {
  static defaultProps = {
    locale: cn ? zhCn : enUs,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      mode: 'datetime',
    };
  }

  onDateChange = (date) => {
    console.log('onChange', format(date));
    this.setState({
      date,
    });
  }

  changeMode = (e) => {
    this.setState({
      mode: e.target.value,
    });
  }

  render() {
    const props = this.props;
    const { date, mode } = this.state;

    return (<div style={{ margin: '10px 30px' }}>
      <h2>date picker</h2>

      <select value={this.state.mode} onChange={this.changeMode}>
        <option>datetime</option>
        <option>date</option>
        <option>time</option>
        <option>month</option>
        <option>year</option>
      </select>

      <div>
        <span>{date && format(date) || format(now)}</span>
        <DatePicker
          rootNativeProps={{'data-xx':'yy'}}
          defaultDate={date || now}
          mode={mode}
          locale={props.locale}
          maxDate={maxDate}
          minDate={minDate}
          onDateChange={this.onDateChange}
        />
      </div>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
