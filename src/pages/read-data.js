import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

export default function Home() {
  const [saveData, setSaveData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetch('/api/getData')
     .then((res) => res.json())
     .then((data) => {
        setSaveData(data.data);
      })
     .catch((e) => {
        alert('hubungi saya', e.message);
      });
  }, []);

  const openModal = (data) => {
    setSelectedData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{ fontFamily: 'monospace',marginTop:"30px", display:"flex", flexDirection:"column", gap:"40px" }}>

      <div className="text-right">
            <Link href={`/`} style={{ backgroundColor:"blue", color:"white", padding:"15px",borderRadius:"7px" }}>Buat Antrian</Link>
            {" "}
            <Link href={`/read-data`} style={{ backgroundColor:"blue", color:"white", padding:"15px",borderRadius:"7px" }}>Daftar Antrian</Link>
        </div>

      <div className="mx-10">
        <div>
          <div className="flex w-full text-center" style={{ fontSize:"19px" }}>
            <p className="w-1/4 border-2 border-black-600">Nama Lengkap</p>
            <p className="w-1/4 border-2 border-black-600">Keperluan</p>
            <p className="w-1/4 border-2 border-black-600">Nomor Antrian</p>
            <p className="w-1/4 border-2 border-black-600">Aksi</p>
          </div>
        </div>
        {saveData &&
          saveData.map((data, index) => {
            return (
              <div key={index} className="flex w-full" style={{ fontSize:"15px" }}>
                <p className="w-1/4 border-2 border-black-600">{data.name}</p>
                <p className="w-1/4 border-2 border-black-600">{data.note}</p>
                <p className="w-1/4 border-2 border-black-600 text-center">{data.antrian}</p>
                <button
                  className="w-1/4 border-2 border-black-600"
                  onClick={() => openModal(data)}
                >
                  Aksi
                </button>
              </div>
            );
          })}
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-4">
          <div className="flex w-full text-center">
            <p className="w-1/4">ID Tamu</p>
            <p className="w-1/4">:</p>
            <p className="w-1/4">{selectedData?.id}</p>
          </div>
          <div className="flex w-full text-center">
            <p className="w-1/4">Nama Lengkap</p>
            <p className="w-1/4">:</p>
            <p className="w-1/4">{selectedData?.name}</p>
          </div>
          <div className="flex w-full text-center">
            <p className="w-1/4">Keperluan</p>
            <p className="w-1/4">:</p>
            <p className="w-1/4">{selectedData?.note}</p>
          </div>
          <div className="flex w-full text-center">
            <p className="w-1/4">Nomor Antrian</p>
            <p className="w-1/4">:</p>
            <p className="w-1/4">{selectedData?.antrian}</p>
          </div>
        </div>
        <button className="m-4" onClick={() => window.print()}>PRINT</button>
        <button className="m-4" onClick={closeModal}>Tutup</button>
      </Modal>
    </div>
  );
}

const Modal = ({ isOpen, onClose, children }) => {
    return (
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {children}
                  </div>
                 
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };