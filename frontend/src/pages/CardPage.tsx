import PageTitle from '../components/PageTitle';
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <PageTitle />
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md mt-4">
                <LoggedInName />
                <CardUI />
            </div>
        </div>
    );
}
export default CardPage;
