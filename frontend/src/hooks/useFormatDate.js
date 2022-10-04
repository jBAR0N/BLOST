const useFormatDate = () => (
    (date)=>{
        const creationDate = new Date (date)
        return creationDate.toLocaleString('default', { month: 'short' }) + " " + creationDate.getDate() + ", " + creationDate.getFullYear()
    }
)

export default useFormatDate