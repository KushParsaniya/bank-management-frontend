import {Card, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "20px auto",
    width: "90%",
    maxWidth: "800px",
    textAlign: "center"
};

const headerStyle = {
    fontSize: "24px",
    marginBottom: "20px",
};

const tableStyle = {
    marginTop: "20px",
};



function TransactionHistory() {
    let [transactions, setTransactions] = useState([]);

    let navigate = useNavigate();

    function fetchData() {
        const data = localStorage.getItem('data');
        const parseData = JSON.parse(data);
        if (parseData.transactions == null) {
            return;
        }
        const storedTransactions = parseData.transactions;

        if (storedTransactions) {
            setTransactions(storedTransactions);
            console.log(storedTransactions);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") == 'false' || localStorage.getItem("isAdmin") == 'true') {
          navigate("/login");
          return;
        }   
        fetchData();
      }, []);

    const Sign = (s) => {
        if (s === 'DEPOSIT' || s === 'INTEREST'){
            return '+';
        } else {
            return '-';
        }
    }
    const TransactionItems = () =>{

        // sorting transaction history by date

        transactions.sort(function (a, b) {
            return  (new Date(b.date) - new Date(a.date)) - (a.time.localeCompare(b.time));
        });

        const listItems = [];
        transactions.map((transaction) => {
            listItems.push(
                <tr>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{Sign(transaction.description)} ₹{transaction.amount}</td>
                    <td>{(transaction.time).slice(0, 8)}</td>
                </tr>
            );
        })
        return listItems;
    } 

    return (
        <Card style={cardStyle}>
            <Card.Body>
                <Card.Title style={headerStyle}>Transaction History</Card.Title>
                <Table striped bordered hover style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TransactionItems()}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default TransactionHistory;