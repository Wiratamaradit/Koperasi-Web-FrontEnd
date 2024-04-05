import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { useState } from "react";

const SavingSimulation = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_LARAVEL;
  const [nominal, setNominal] = useState(0);
  const [result, setResult] = useState<any>();

  const handleCalculate = async () => {
    const response = await axios
      .post(`${API_URL}/api/savingSimulation`, {
        saveTotal: nominal,
        interest: 0.002,
      })
      .then((response) => {
        setResult(response.data);
        setNominal(0);
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
        disabled={nominal === 0}
      />
      <Button
        label="Reset"
        severity="danger"
        icon="pi pi-refresh"
        style={{ marginLeft: "0.5em" }}
        onClick={() => {
          setNominal(0);
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
                <p>Nominal simpanan Per Bulan</p>
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
                <p>Bunga Simpanan</p>
              </div>
              <div className="col-9">
                <InputText
                  id="interest"
                  name="interest"
                  value={"0.2%"}
                  readOnly
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </div>
      </Card>

      {result && (
        <Panel header="Hasil Perhitungan" className="mt-2">
          <div className="grid">
            <div className="col-4">
              <div className="text-center p-2 border-round-sm font-bold">
                Pengajuan Simpanan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.saveTotal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 border-round-sm font-bold">
                Periode 12 Bulan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.timePeriode1.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 border-round-sm font-bold">
                Periode 18 Bulan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.timePeriode2.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 border-round-sm  font-bold">
                Periode 24 Bulan
              </div>
            </div>
            <div className="col-8">
              <div className="text-center p-2 border-round-sm surface-200 font-bold ">
                {result.data.timePeriode3.toLocaleString("id-ID", {
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

export default SavingSimulation;
