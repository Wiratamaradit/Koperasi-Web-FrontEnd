import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const SavingSimulationResult = () => {
  return (
    <form className="form w-50">
      <div className="grid">
        <div className="col-3">
          <p>Jangka waktu 12 Bulan</p>
        </div>
        <div className="col-9">
          <InputNumber
            id="loanTotal"
            name="loanTotal"
            readOnly
            className="w-full"
          />
        </div>
        <div className="col-3">
          <p>Jangka waktu 18 Bulan</p>
        </div>
        <div className="col-9">
          <InputText
            id="interest"
            name="interest"
            readOnly
            className="w-full"
          />
        </div>
        <div className="col-3">
          <p>Jangka waktu 24 Bulan</p>
        </div>
        <div className="col-9">
          <InputText
            id="interest"
            name="interest"
            readOnly
            className="w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default SavingSimulationResult;
