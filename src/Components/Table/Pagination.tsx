import { Flex, Select ,Text} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
interface Props{
  itemsPerPage : number
  setItemsPerPage : (item:number) => void 
  currentPage : number
  setCurrentPage : (page:number) => void
  totalPages :number
  totalItems:number
  startPage : number
  endPage : number
  visiblePages :number
}
const Pagination = ({itemsPerPage , setItemsPerPage , currentPage ,setCurrentPage 
  ,totalPages,totalItems , startPage ,endPage}:Props) => {
    // const visiblePages = 3;
    // const startPage = Math.max(1, itemsPerPage  - Math.floor(visiblePages / 2));
    // const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return (
        <Flex style={{ justifyContent: 'space-between', marginTop: '16px', padding: '10px 0' }}>
          <Flex style={{ alignItems: 'center', gap: '8px' }}>
            <Text size="sm" color="#6b7280">Showing</Text>
            <Select
              value={String(itemsPerPage)}
              onChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
              data={['2' , '5', '10', '15', '20']}
              size="sm"
              styles={{ 
                  input: { 
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    height: '30px',
                    fontSize: '14px'
                  }
                }}
      
            />
            <Text size="sm" color="#6b7280">out of {totalItems}</Text>
          </Flex>

          <Flex style={{alignItems: 'center', gap: '4px' }}>
            <button disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style = {{ 
              backgroundColor: '#e5e7eb', 
              color: '#6b7280',
              padding: '6px', 
              borderRadius: '50%', 
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '30px',
              height: '30px'
                      }
                  }>
              <IconChevronLeft size={16} />
            </button>

            {startPage > 1 && <button onClick={() => setCurrentPage(1)}>1</button>}
            {startPage > 2 && <Text size="sm">...</Text>}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <button
                key={startPage + i}
                onClick={() => setCurrentPage(startPage + i)}
                style={{
                  backgroundColor: currentPage === startPage + i ? '#d1fae5' : 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '50%',
                  padding: '6px',
                  cursor: 'pointer'
                }}
              >
                {startPage + i}
              </button>
            ))}

            {endPage < totalPages - 1 && <Text size="sm">...</Text>}
            {endPage < totalPages && <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>}

            <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
            style = {{ 
              backgroundColor: '#e5e7eb', 
              color: '#6b7280',
              padding: '6px', 
              borderRadius: '50%', 
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '30px',
              height: '30px'
                      }
                  }>
              <IconChevronRight size={16} />
            </button>
          </Flex>
      </Flex>
    );
  };

  export default Pagination