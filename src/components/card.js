import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
    border: 3px solid rgb(26,26,51);
    background: rgb(43,43,85);
    color: rgb(239,239,247);
    border-radius: .2rem;
    margin: 0 0 2rem;

    > img {
        width: 100%;
    }

    > section {
        padding: 1rem;
    }

    h2, h3 {
        color: rgb(167,167,84);
        margin: 0;
    }

    h3 {
        font-size: .8rem;
        color: rgb(161,161,208);
    }
`;

export default ({ image, name, text, set, type }) => (<Card>
    <img alt={name} src={image}></img>
    <section>
        <h2>{name}</h2>
        <h3><i>{type} from the {set}</i></h3>
        {text ? <p>{text}</p> : ""}
    </section>
</Card>);
