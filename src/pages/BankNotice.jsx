import React from 'react';
import '../style/banknotice.css';

const BankNotice = () => {
  return (
    <div className="notice-container">
      <div className="notice-box">
        <h1>Important Notice</h1>
        <p>
          Dear valued customer,<br />
          We would like to inform you that there is some important information that you need to be aware of. Please read the following notice carefully:
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec urna sit amet libero volutpat consequat. Nullam tincidunt quam ut dui lacinia, a mattis ligula cursus. Integer vel risus ac sapien euismod scelerisque.
        </p>
        <p>
          Nam vel turpis nec dolor auctor tristique. Sed lacinia lectus eu elit rhoncus, nec euismod arcu ultrices. Curabitur vel enim vel ligula viverra fermentum. Donec sed purus at turpis dignissim posuere id in ante.
        </p>
      </div>
    </div>
  );
}

export default BankNotice;
