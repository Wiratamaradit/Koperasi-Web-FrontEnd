export const handleDataDropdown = (data: any) => {
    if (data !== null && Array.isArray(data) && data.length !== 0) {
        if (data[0].hasOwnProperty("Id")) {
            return data.map((item: { Id: any; Code: any; Name: any }) => {
                if (item.Code && item.Name) {
                    return {
                        name: `${item.Code} (${item.Name})`,
                        code: item.Id,
                    };
                } else if (item.Code) {
                    return {
                        name: item.Code,
                        code: item.Id,
                    };
                } else if (item.Name) {
                    return {
                        name: item.Name,
                        code: item.Id,
                    };
                } else {
                    return {
                        name: item.Id,
                        code: item.Id,
                    };
                }
            });
        } else {
            return data.map((item: any) => ({
                name: item,
                code: item
            }));
        }

    } else {
        return null
    }
}