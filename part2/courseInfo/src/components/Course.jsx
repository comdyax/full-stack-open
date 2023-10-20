const Header3 = ({ head }) => <h3>{head}</h3>

const Content = ({ parts }) => {
    return (
        <>
            <ul>
                {parts.map(part =>
                    <Part key={part.id} part={part} />
                )}
            </ul>
        </>
    )
}

const Part = ({ part }) => <li>{part.name}: {part.exercises}</li>

const Total = ({ parts }) => {
    const totalSum = parts.map((part => part.exercises)).reduce((acc, value) => acc + value)
    return (
        <b>total of {totalSum} exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header3 key={course.id} head={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course