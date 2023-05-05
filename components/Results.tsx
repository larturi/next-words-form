interface ResultProps {
   countOk: number;
   countError: number;
}

const Results: React.FC<ResultProps> = ({ countOk, countError }) => {
   return (
      <div className='flex justify-between mt-6'>
         <div>
            <p>Correct</p>
            <h1
               className='
                text-gray-300 
                  text-2xl 
                  mb-1
                  font-bold
                  text-center
                '
            >
               {countOk}
            </h1>
         </div>

         <div>
            <p>Incorrect</p>
            <h1
               className='
                text-gray-300 
                  text-2xl 
                  mb-1
                  font-bold
                  text-center
            '
            >
               {countError}
            </h1>
         </div>
      </div>
   );
};

export default Results;
