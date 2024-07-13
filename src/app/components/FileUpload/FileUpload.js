import React, {useEffect, useState} from 'react';
import {specificApis} from "../../data/SpecificApis";
import './FileUpload.css';
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const FileUpload = ({center,apiFunction,type}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    useEffect(() => {
        const key =  type == "employee" ? 'signatureUrl' :'letterHeadUrl'
        if (center[key]) {
            downloadFile(center[key]);
        }
    }, [center]);

    async function fetchCenters() {
        try {
            return await specificApis.fetchCenters();
        } catch (error) {
            console.error('Failed to fetch center information:', error);
        }
    }

    async function fetchedEmployees() {
        try {
            return await specificApis.fetchEmployeeList()
        } catch (error) {
            console.error('Failed to fetch center information:', error);
        }
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size < 3 * 1024 * 1024) {
            try {
                if (confirm('Are you sure you want to upload this file?')) {
                    console.log(center);
                    const key = type == "employee" ? 'empId' : 'id'
                    await specificApis[apiFunction ?? 'addLetterHeadToCenter'](selectedFile, center[key]);
                    const centers =  type == "employee" ? await fetchedEmployees() : await fetchCenters();
                    console.log(centers);
                    const findNewLetterHeadUrl = await centers.find(item => item[key] === center[key]);
                    console.log(findNewLetterHeadUrl);
                    await downloadFile(findNewLetterHeadUrl[ type == "employee" ? 'signatureUrl' : 'letterHeadUrl']);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            alert('Please select a file less than 3 MB');
        }
    };

    const downloadFile = async (fileId) => {
        console.log(fileId);
        setIsLoadingImage(true);
        try {
            const response = await specificApis.downloadFile(fileId);
            const url = URL.createObjectURL(response);
            setImagePreviewUrl(url);
            setIsLoadingImage(false);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="upload-component">
            <label className="btn-file" onChange={handleFileChange}>
                <FontAwesomeIcon icon={faFileUpload} style={{fontSize: '44px', color: '#3769cb'}}/>
                <input type="file" style={{display: 'none'}}/>
                <p>Click to change center avatar</p>
            </label>

            {isLoadingImage ? (
                <div className="loading-custom">Loading</div>
            ) : (
                imagePreviewUrl && <img src={imagePreviewUrl} alt="Blob Image" className="image-preview"/>
            )}
        </div>
    );
};


export default FileUpload;
