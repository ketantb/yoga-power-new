import React from 'react'
import {
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { FaEye } from 'react-icons/fa'
import { empLoyeeeRights } from '../hr/Rights/rightsValue/crmRightsValue'

const WidgetsDropdown2 = ({access,isAdmin}) => {

  

    return (
        <CRow>

            {(access?.includes(empLoyeeeRights.achived)||isAdmin) && <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    style={{ backgroundColor: 'red', color: "white" }}
                    value={
                        <>
                            <div style={{ padding: 0, margin: 0 }}>100000</div>
                            <span className="fs-6 fw-normal">
                                (Achived 200000)
                            </span>
                        </>
                    }
                    title="Target"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle
                                color="transparent"
                                caret={false}
                                className="p-0"
                            >
                                <FaEye
                                    size='25px'
                                    className="text-high-emphasis-inverse" />

                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    '1 Week',
                                    '2 Week',
                                    '3 Week',
                                    '4 Week',
                                ],
                                datasets: [
                                    {
                                        label: 'Achived Target',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: getStyle('--cui-red'),
                                        data: [20000, 15000, 31000, 25000,],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: 1000,
                                        max: 100000,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>}
            {(access?.includes(empLoyeeeRights.target)||isAdmin)&&<CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={
                        <>
                            $6.200{' '}
                            <span className="fs-6 fw-normal">
                                (40.9% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title="Target"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle
                                color="transparent"
                                caret={false}
                                className="p-0"
                            >
                                <CIcon
                                    icon={cilOptions}
                                    className="text-high-emphasis-inverse"
                                />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                ],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: getStyle('--cui-info'),
                                        data: [1, 18, 9, 17, 34, 22, 11],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: -9,
                                        max: 39,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>}
            {(access?.includes(empLoyeeeRights.incentive)||isAdmin)&&<CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="warning"
                    value={
                        <>
                            2.49{' '}
                            <span className="fs-6 fw-normal">
                                (84.7% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title="Incentive"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle
                                color="transparent"
                                caret={false}
                                className="p-0"
                            >
                                <CIcon
                                    icon={cilOptions}
                                    className="text-high-emphasis-inverse"
                                />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartLine
                            className="mt-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                ],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: [78, 81, 80, 45, 34, 12, 40],
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        display: false,
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 2,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>}
            {(access?.includes(empLoyeeeRights.profit)||isAdmin)&&<CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value={
                        <>
                            44K{' '}
                            <span className="fs-6 fw-normal">
                                (-23.6% <CIcon icon={cilArrowBottom} />)
                            </span>
                        </>
                    }
                    title="Profit"
                    action={
                        <CDropdown alignment="end">
                            <CDropdownToggle
                                color="transparent"
                                caret={false}
                                className="p-0"
                            >
                                <CIcon
                                    icon={cilOptions}
                                    className="text-high-emphasis-inverse"
                                />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    }
                    chart={
                        <CChartBar
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                ],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: [
                                            78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                                            67, 82,
                                        ],
                                        barPercentage: 0.6,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>}
        </CRow>
    )
}

export default WidgetsDropdown2
