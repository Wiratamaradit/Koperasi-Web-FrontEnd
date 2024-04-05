import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { useState } from "react";

const LoanSimulation = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_LARAVEL;
  const [nominal, setNominal] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [result, setResult] = useState<any>();

  const handleCalculate = async () => {
    const response = await axios
      .post(`${API_URL}/api/loanSimulation`, {
        loanTotal: nominal,
        interest: 0.02,
        tenor: tenor,
      })
      .then((response) => {
        setResult(response.data);
        setNominal(0);
        setTenor(0);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const footer = (
    <>
      <Button
        label="Hitung"
        icon="pi pi-calculator"
        onClick={handleCalculate}
        disabled={nominal === 0 || tenor === 0}
      />
      <Button
        label="Reset"
        severity="danger"
        icon="pi pi-refresh"
        style={{ marginLeft: "0.5em" }}
        onClick={() => {
          setNominal(0);
          setTenor(0);
          setResult(null);
        }}
      />
    </>
  );

  return (
    <>
      <Card title="Simulasi Perhitungan Pinjaman" footer={footer}>
        <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
          <form className="form w-50">
            <div className="grid">
              <div className="col-3">
                <p>Nominal Pinjaman</p>
              </div>
              <div className="col-9">
                <InputNumber
                  id="loanTotal"
                  name="loanTotal"
                  placeholder="Isi nominal pinjaman anda"
                  className="w-full"
                  onChange={(e: any) => setNominal(e.value)}
                  value={nominal}
                />
              </div>
              <div className="col-3">
                <p>Bunga Pinjaman</p>
              </div>
              <div className="col-9">
                <InputText
                  id="interest"
                  name="interest"
                  value={"2%"}
                  readOnly
                  className="w-full"
                />
              </div>
              <div className="col-3">
                <p>Tenor</p>
              </div>
              <div className="col-9">
                <Dropdown
                  id="tenor"
                  name="tenor"
                  placeholder="Pilih tenor yang diinginkan"
                  options={[
                    { label: "Cicilan 6 Bulan", value: 6 },
                    { label: "Cicilan 12 Bulan", value: 12 },
                  ]}
                  optionLabel="label"
                  className="w-full"
                  onChange={(e: any) => setTenor(e.value)}
                  value={tenor}
                />
              </div>
            </div>
          </form>
        </div>
      </Card>

      {result && (
        <Panel header="Hasil Perhitungan" className="mt-2" >
          <div className="grid">
          <div className="col-4">
              <div className="text-center p-2 border-round-sm font-bold">
                Pengajuan Pinjaman
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.loanTotal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 border-round-sm font-bold">
                Bunga Per Bulan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.interestPerMonth.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 border-round-sm font-bold">
                Pembayaran Per Bulan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.paymentPerMonth.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 border-round-sm  font-bold">
                Total Pelunasan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.paymentTotal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
          </div>
        </Panel>
      )}
    </>
  );
};

export default LoanSimulation;
{/* <DataTable
            value={result.installment}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="intallment" header="Intallment" />
            <Column field="interest" header="Interest" />
            <Column field="total" header="Total" />
          </DataTable> */}