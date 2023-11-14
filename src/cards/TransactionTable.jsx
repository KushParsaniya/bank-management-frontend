import { Card, Table } from "react-bootstrap";
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
};

const headerStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    
};

const tableStyle = {
    marginTop: "20px",
};


function TransactionTable() {

    const navigate = useNavigate();

    let [transactions, setTransactions] = useState([]);

    async function loadTransactions() {
        const data = localStorage.getItem('data');
        const parseData = JSON.parse(data);
 
        
        const storedTransactions = parseData && parseData.transactions;
        if (storedTransactions) {
            setTransactions(storedTransactions);
            console.log(storedTransactions);
        }
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    const Sign = (s) => {
        if (s === 'DEPOSIT' || s === 'INTEREST') {
            return '+';
        } else {
            return '-';
        }
    }

    function clickHandler() {
        navigate("transactionHistory")
    }

    const TransactionItems = () => {


        // sorting transaction history by date and time
        transactions.sort(function (a, b) {
            return  (new Date(b.date) - new Date(a.date)) - (a.time.localeCompare(b.time));
        });



        // transactions = transactions.sort(function (a, b) {
        //     return b.time.localeCompare(a.time);
        // });

        const listItems = [];
        let threeTransaction = transactions.slice(0, 3);
        threeTransaction.map((transaction) => {
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
        <Card style={cardStyle} onClick={clickHandler}>
            <Card.Body>
                <Card.Title style={headerStyle}>Transaction Table</Card.Title>
                <Table striped bordered hover style={tableStyle}>
                    <thead >
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

export default TransactionTable;


