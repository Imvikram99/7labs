import React, {useState, useEffect} from 'react';
import {specificApis} from '../data/SpecificApis';
import AddLabCenterModal from './AddLabCenterModal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faFileUpload, faHome} from "@fortawesome/free-solid-svg-icons";
import FileUpload from "@/app/components/FileUpload/FileUpload";
import {CustomModal} from "@/app/components/CustomModal";

export default function LabCenter() {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState({});


    useEffect(() => {
        fetchCenters();
    }, []);

    async function fetchCenters() {
        try {
            const fetchedCenters = await specificApis.fetchCenters();
            setCenters(fetchedCenters);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch center information:', error);
            setLoading(false);
        }
    }

    const handleAddCenter = async (centerDetails) => {
        try {
            await specificApis.addLabCenter(centerDetails);
            fetchCenters();  // Refresh list after adding
        } catch (error) {
            console.error('Error adding lab center:', error);
        }
    };

    const handleDetailsModal = () => {
        setShowDetailsModal(prevState => !prevState);
        fetchCenters()
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h6 className="uppercase font-extrabold text-xl"><FontAwesomeIcon icon={faHome}/> | Lab Centers
            </h6>
            <hr/>
            <div className="card">
                <div className="card-body">
                    <div className="w-100 text-right">
                        <button onClick={() => setModalOpen(true)}
                                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Add
                            Lab Center
                        </button>
                    </div>
                    <AddLabCenterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddCenter}/>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th>Center Name</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>Is Certified</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {centers.map((center, index) => (
                                <tr key={index}>
                                    <td className="capitalize">{center.name}</td>
                                    <td>{center.address}</td>
                                    <td>{center.phone}</td>
                                    <td>{center.isCertified ? <span className="text-green-600">Yes</span> :
                                        <span className="text-red-500">No</span>}</td>
                                    <td>
                                        <FontAwesomeIcon className="f-aw-upload me-1" icon={faFileUpload}
                                                         onClick={() => {
                                                             handleDetailsModal();
                                                             setSelectedCenter(center)
                                                         }}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>

            {
                showDetailsModal && (
                    <CustomModal showModal={showDetailsModal} handleClose={handleDetailsModal}>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Lab Center Profile</h2>
                        <hr/>
                        <FileUpload center={selectedCenter}/>
                    </CustomModal>
                )
            }
        </div>
    );
}