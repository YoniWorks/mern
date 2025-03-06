// import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

// const CardPage = () =>
// {
//     return(
//         <div>
//             <PageTitle />
//             <LoggedInName />
//             <CardUI />
//         </div>
//     );
// }

const CardPage = () => {
    return (
        <div>
            <div>
                <LoggedInName />
                <CardUI />
            </div>
        </div>
    );
}
export default CardPage;
