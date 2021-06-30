import React, {useState} from "react";
import {Modal, Form, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {getWallet, decryptStore} from "persistencejs/build/utilities/keys";
import {useTranslation} from "react-i18next";
import privateKeyIcon from "../../../assets/images/PrivatekeyIcon.svg";
import Icon from "../../../icons";

const CommonKeystorePwd = (props) => {
    const {t} = useTranslation();
    const history = useHistory();
    const [show, setShow] = useState(true);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const handleSubmit = e => {
        e.preventDefault();
        const password = document.getElementById("password").value;
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.uploadFile.files[0], "UTF-8");
        fileReader.onload = e => {
            const res = JSON.parse(e.target.result);
            const error = decryptStore(res, password);
            if (error.error != null) {
                setIncorrectPassword(true);
                return (<div>ERROR!!</div>);
            } else {
                const wallet = getWallet(error.mnemonic);
                localStorage.setItem("address", wallet.address);
                localStorage.setItem("mnemonic", error.mnemonic);
                history.push('/profile');
            }
        };
    };
    const handleClose = () => {
        setShow(false);
        props.setExternalComponent("");
        history.push('/');
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose} className="mnemonic-login-section login-section key-select" centered>
                <Modal.Header closeButton>
                    {t("LOGIN_WITH_KEYSTORE")}
                </Modal.Header>
                <Modal.Body>
                    <div className="mrt-10">
                        <div className="button-view">
                            <div className="icon-section">
                                <div className="icon"><img src={privateKeyIcon} alt="privateKeyIcon"/> </div>
                                {t("LOGIN_WITH_PWD")}</div>
                            <Icon viewClass="arrow-icon" icon="arrow" />
                        </div>
                    </div>
                    <Form onSubmit={handleSubmit}>

                        <Form.Label>{t("DECRYPT_KEY_STORE")}</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            required={true}
                        />
                        {incorrectPassword ?
                            <Form.Text className="error-response">
                                {t("INCORRECT_PASSWORD")}
                            </Form.Text>
                            : ""
                        }
                        <div className="submitButtonSection">
                            <Button
                                variant="primary"
                                type="submit"
                                className="button-double-border"
                            >
                                {t("LOGIN")}
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default CommonKeystorePwd;
