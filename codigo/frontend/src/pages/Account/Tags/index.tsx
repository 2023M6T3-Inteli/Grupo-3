import { useState, ChangeEvent, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Bals, Balls, Container, Titulo, SubTitulo } from './styles';
import SearchBox from '../../../components/SearchBox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
    checkboxes: string[];
}

const Account: React.FC = () => {
    const navigate = useNavigate();

    const handleOnClickUsers = useCallback(
        () => navigate("/Account/User", {replace: true}),
        [navigate]
    );

    const [checkboxes, setCheckboxes] = useState<string[]>([]);
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Adicionar valor ao array de checkboxes
            setCheckboxes([...checkboxes, value]);
            console.log('ta check')
        } else {
            // Remover valor do array de checkboxes
            setCheckboxes(checkboxes.filter((item) => item !== value));
            console.log('não ta check')
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const data: FormData = {
            checkboxes: checkboxes.map((item) => item.toString()),
        };
        
        axios.post('/users/setup/tags', data)
         .then((response)=>{
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         
        })

        console.log(data);
    };

    return (
        <Container >

            <Grid container spacing={1} style={{ width: 347, height: 47 }}>
                <Grid item xs={12}>
                    <Container>
                        <Balls />
                        <Bals />
                        <Bals />
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <Titulo>Tell us what you´re interested in</Titulo>
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <SubTitulo>In order to recommend the most intrnguing content for you, we will ask some questions to get to know you better</SubTitulo>
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <SearchBox />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} action="url.com" method="POST">

                        <div style={{ display: "flex", flexWrap:'wrap', justifyContent: "center" }}>
                            <Paper sx={{ height: 109, width: 150, backgroundColor: "#0672CB", borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between",marginTop:1, marginRight:1 }}>
                                <div><p style={{ color: "white" }}>Front-end <br />developing</p></div>
                                <div><input type='checkbox' value={'Front-end'} /></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 150, backgroundColor: "#0672CB", borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between", marginTop: 1, marginRight: 1 }}>
                                <div><p style={{ color: "white" }}>Ux</p></div>
                                <div><input type='checkbox' value={'ux'} /></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 150, backgroundColor: "#0672CB", borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between", marginTop: 1, marginRight: 1 }}>
                                <div><p style={{ color: "white" }}>Back-end<br />developing</p></div>
                                <div><input type='checkbox' value={'Back-end'} /></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 150, backgroundColor: "#0672CB", borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between", marginTop: 1, marginRight: 1 }}>
                                <div><p style={{ color: "white" }}>Machine learning/<br />AI</p></div>
                                <div><input type='checkbox' value={'Machine learning'}/></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 150, backgroundColor: "#0672CB", borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between", marginTop: 1, marginRight: 1 }}>
                                <div><p style={{ color: "white" }}>Cyber Security</p></div>
                                <div><input type='checkbox' value={'Cyber Security'} /></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 150, backgroundColor: "#0672CB", borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between", marginTop: 1, marginRight: 1 }}>
                                <div><p style={{ color: "white" }}>Testing</p></div>
                                <div><input type='checkbox' value={'Testing'}/></div>
                            </Paper>
                        </div>

                        <Grid item xs={12} style={{marginTop:20}}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ display: 'flex', height: 40, width: 347, backgroundColor: "#0672CB", justifyContent: 'center' }}>
                                    <button type='submit' onClick={handleOnClickUsers} style={{ color: 'white' }}>NEXT</button>
                                </div>
                            </div>
                        </Grid>
                    </form>
                </Grid>

            </Grid>

            <GlobalStyles />
        </Container>
    );
}

export default Account;